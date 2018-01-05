import { validator } from 'express-validator';
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
import * as fs from 'fs-extra'
const uuid = require('uuid/v1');

module.exports = app => {
    const repo = app.repositories.sql.ImageRepository;

    app.post('/resources/upload', app.xticate.authenticate(), function(req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;

        if (!fs.existsSync('profiles')) {
            fs.mkdirsSync('profiles');
        }
        if (fs.existsSync('profiles/temp'))
            fs.mkdirsSync('profiles/temp');

        let path = 'profiles/temp/' + req.user.id;
        if (!fs.existsSync(path)) {
            fs.mkdirsSync(path);
        }
        //sampleFile.mv(path + '/' + uuid() + '.jpg', function(err) {
        sampleFile.mv(path + '/' + sampleFile.name, function(err) {
            if (err)
                return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });
    app.delete('/resources/clear', app.xticate.authenticate(), function(req, res) {
        let path = 'profiles/temp/' + req.user.id;
        if (fs.existsSync(path)) {
            fs.remove(path);
        }
    });
    app.delete('/resources/images/:id', app.xticate.authenticate(), function(req, res) {
        //console.log(req.params.id);

        let path = 'profiles/temp/' + req.user.id + "/" + req.params.id;
        if (fs.existsSync(path)) {
            fs.remove(path);
        }
        res.json()
    });



    app.delete('/resources/products/images/:id/:image', app.xticate.authenticate(), function(req, res) {
        //console.log(req.params.id);

        let path = 'products/images/' + req.params.id + "/" + req.params.image;
        console.log(path)
        if (fs.existsSync(path)) {
            repo.delete({
                name: req.params.image
                    //product_id: req.params.id
            }, result => {
                fs.remove(path);
                res.json()
            })
        }
        res.json()
    });




    app.get('/resources/file', function(req, res) {

        let file = "filename.jpg";
        fs.stat(file, function(err, stats) {
            console.log('STATS', stats);

        });

        console.log("ok.....................");
    });
    app.get('/resources/images/:id/:img', function(req, res) {
        var path = require('path');
        var image = path.resolve('products/images/' + req.params.id + "/" + req.params.img)
        res.sendFile(image);
    });
    app.get('/resources/products/images/default/:id', function(req, res) {
        var path = require('path');
        var image = repo.getDefaultProductImage({
            id: req.params.id
        }, image => {
            if (image != null) {
                var img = path.resolve('products/images/' + req.params.id + "/" + image.name);
                res.sendFile(img);
            } else {
                res.sendFile(path.resolve("products/default.jpg"))
            }
        })
    })
}
module.exports = app => {
    const repo = app.repositories.ProductRepository;

    //Get Product
    app.get("/Products/:id", (req, res) => {
        let model = req.params
        repo.findById(model, (result) => {
            try {
                res.json({product: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    //Delete Product
    app.delete("/Products/:id", (req, res) => {
        let model = req.params
        repo.deleteById(model, (result) => {
            try {
                res.json({product: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    //Update Product
    app.put("/Products/:id", (req, res) => {
        let model = req.body
        let params = req.params
        repo.putById(model, params, (result) => {
            try {
                res.json({product: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    //Add Product
    app.post("/products", (req, res) => {
        let model = req.body;
        repo.add(model, (result) => {
            try {
                res.json({product: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    
}
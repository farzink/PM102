module.exports = app => {
    const repo = app.repositories.CategoryRepository;

    //Get one Category
    app.get("/categories/:id", (req, res) => {
        let model = req.params
        repo.findById(model, (result) => {
            try {
                res.json({category: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    //Get All Categories
    app.get("/categories", (req, res) => {
        repo.findAll(null, (result) => {
            try {
                res.json({categories: result});
            }
            catch(err){
                    res.json(err.message);
            }
        })
    });

    //Delete Category
    app.delete("/categories/:id", (req, res) => {
        let model = req.params
        repo.deleteById(model, (result) => {
            try {
                res.json({category: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    //Update Category
    app.put("/categories/:id", (req, res) => {
        let model = req.body
        let params = req.params
        repo.putById(model, params, (result) => {
            try {
                res.json({category: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });

    //Add Category
    app.post("/categories", (req, res) => {
        let model = req.body;
        repo.add(model, (result) => {
            try {
                res.json({category: result});
            }
            catch(err){
                    res.json(err.message);
            }
        });
    });
}
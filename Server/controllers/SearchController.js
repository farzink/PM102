module.exports = app => {
    const repo = app.repositories.SearchRepository;

    app.get("/search", (req, res) => {
        let model = req.query
        
        repo.findByQuery(model, (result) => {
            res.json({ product: result });
        });
    });
}
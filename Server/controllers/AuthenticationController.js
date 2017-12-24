import jwt from "jwt-simple";
import bcrypt from "bcrypt";

module.exports = app => {
    const cfg = app.libs.configuration;
    const Profiles = app.libs.db.init.models.Profiles;
    app.post("/token", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Profiles.findOne({ where: { email: email } })
                .then(profile => {
                    if (Profiles.isPassword(profile.password, password)) {
                        const content = { id: profile.id };
                        var token = jwt.encode({ id: content.id }, cfg.jwtSecret);
                        res.json(token);
                        // {
                        //     id: content.id,
                        //     expiresIn: "2min"
                        // }, jwt.encode(content, cfg.jwtSecret));
                    } else {
                        res.sendStatus(401);
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.sendStatus(401);
                });
        } else {
            res.sendStatus(401);
        }
    });
};
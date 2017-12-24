import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

module.exports = app => {
    const Profiles = app.libs.db.init.models.Profiles;
    const cfg = app.libs.configuration;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    const strategy = new Strategy(params, (load, authorized) => {
        Profiles.findById(load.id)
            .then(profile => {
                if (profile) {
                    console.log(profile.id);
                    return authorized(null, {
                        id: profile.id,
                        email: profile.email,
                        role: profile.role
                    });
                }
                return authorized(null, { success: false, profile: null });
            })
            .catch(error => authorized(error, null));
    });
    passport.use(strategy);

    const authUtil = {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            var authentication = passport.authenticate("jwt", cfg.jwtSession);
            console.log(authentication);
            return authentication;
        }
    };
    app.xticate = authUtil;
    return authUtil;
};
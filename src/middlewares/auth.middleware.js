import passport from "passport";

export const authJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect("/api/sessions/login");
    }
    req.user = user;
    next();
  })(req, res, next);
};
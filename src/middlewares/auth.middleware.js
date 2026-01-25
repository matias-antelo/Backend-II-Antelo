import passport from "passport";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./auth.js";


export const authJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect("/api/sessions/login");
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const redirectAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next();
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.redirect("/api/sessions");
  } catch (error) {
    return next();
  }
};

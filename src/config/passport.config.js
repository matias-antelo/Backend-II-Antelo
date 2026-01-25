import passport from "passport";
import local from "passport-local";
import usersModel from "../model/users.model.js";
import usersService from "../services/users.service.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "passport-jwt";
import { jwtSecret } from "../middlewares/auth.js";
import cartsModel from "../model/carts.model.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    const user = await usersService.registerUser({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        age: req.body.age,
                        email: username,
                        password
                    });

                    return done(null, user);
                } catch (error) {
                    return done(error.message);
                }
            }
        )
    );


    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await usersModel.findOne({ email: username })
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.jwt]),
        secretOrKey: process.env.JWT_SECRET
    },
        async (jwt_payload, done) => {
            try {
                const user = await usersModel.findById(jwt_payload.id);
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        }
    ));
};

export default initializePassport;
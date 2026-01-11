import passport from "passport";
import local from "passport-local";
import usersModel from "../model/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from "passport-jwt";
import { jwtSecret } from "../middlewares/auth.js";
import cartsModel from "../model/carts.model.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {

            const { first_name, last_name, age } = req.body;
            try {
                let user = await usersModel.findOne({ email: username });
                if (user) {
                    console.log("El usuario existe");
                    return done(null, false);
                }

                const cart = await cartsModel.create({
                    cartNumber: Date.now(),
                    products: []
                });

                const newUser = {
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password: createHash(password),
                    cart: cart._id,
                    role: 'user'
                };
                let result = await usersModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done("Error al registrar el usuario: " + error);
            }
        }
    ))


    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await usersModel.findOne({ email: username })
            if (!user) {
                console.log("Usuario no encontrado");
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log("Contraseña inválida");
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

    passport.use(
        "jwt",
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.jwt]),
            secretOrKey: jwtSecret
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
        )
    );
};

export default initializePassport;
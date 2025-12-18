import passport from "passport";
import local from "passport-local";
import usersModel from "../model/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

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
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: null,
                    role: 'user'
                };
                let result = await usersModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done("Error al registrar el usuario: " + error);
            }
        }
    ))
};

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    let user = await usersModel.findById(id);
    done(null, user);
});


passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
        const user = await usersModel.findOne({ email: username })
        if (!user) {
            console.log("Usuario no encontrado");
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

export default initializePassport;
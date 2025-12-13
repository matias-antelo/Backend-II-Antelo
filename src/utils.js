import bcrypt from "bcrypt";

function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}   

export { createHash, isValidPassword };
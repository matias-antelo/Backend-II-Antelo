import jwt from "jsonwebtoken";

const JWT_SECRET = "coderSecretKey";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const jwtSecret = JWT_SECRET;

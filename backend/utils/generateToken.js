import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_CODE, { expiresIn: "1d" });
};

export { generateToken };

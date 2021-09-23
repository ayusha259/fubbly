import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_CODE);
        req.body.user_id = decodedToken.id;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Invalid Token, not authorized");
      }
    } else {
      res.status(401);
      throw new Error("No token, not authorized");
    }
  } catch (error) {
    next(error);
  }
};

export default auth;

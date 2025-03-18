import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      console.error("Failed to decode token");
      return null;
    }

    return decoded;
  } catch (err) {
    console.error("Token decoding error:", err);
    return null;
  }
};

const disableMethodsForNonAdmin = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  /*
  if (!accessToken || !refreshToken) {
    return res.status(403).json({ message: "Access denied" });
  }
*/
  const user = decodeToken(accessToken);
  console.log(user);
  console.log(req.method);

  if (user && user.isAdmin === 0) {
    if (["PUT", "GET", "DELETE"].includes(req.method)) {
      return res.status(403).json({ message: "Access denied" });
    }
  }

  next();
};


export { disableMethodsForNonAdmin};

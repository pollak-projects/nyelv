import jwt from "jsonwebtoken";

// Define the decodeToken function within the same file
const decodeToken = (token) => {
  try {
    // Decoding the token without verifying its signature
    const decoded = jwt.decode(token); // Decodes the payload

    if (!decoded) {
      console.error("Failed to decode token");
      return null; // Return null if decoding fails
    }

    return decoded; // This will return the decoded user object (payload)
  } catch (err) {
    console.error("Token decoding error:", err);
    return null;
  }
};

// Middleware to disable methods for non-admin users
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

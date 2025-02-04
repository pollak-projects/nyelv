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
    return null; // Return null if there's an issue during decoding
  }
};

// Middleware to disable methods for non-admin users
const disableMethodsForNonAdmin = (req, res, next) => {
  // Allow POST methods for login, register, and logout
  if (
    ["POST"].includes(req.method) &&
    (req.url === "/auth/login" ||
      req.url === "/auth/register" ||
      req.url === "/auth/logout")
  ) {
    return next(); // Skip this middleware for login, register, and logout
  }

  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  if (!accessToken || !refreshToken) {
    return res.status(403).json({ message: "Access denied" });
  }

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

export default disableMethodsForNonAdmin;

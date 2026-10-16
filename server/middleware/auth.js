import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const auth = (request, response, next) => {
  try {
    const token = request.cookies?.accessToken || request.headers?.authorization?.split(" ")[1];
    if (!token) return response.status(401).json({ message: "Provide token", error: true, success: false });
    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode?.id) return response.status(401).json({ message: "Unauthorized access", error: true, success: false });
    request.userId = decode.id;
    return next();
  } catch {
    return response.status(401).json({ message: "Unauthorized access - You have not logged in", error: true, success: false });
  }
};

// Authentication alone is not enough for administrative actions.
// Re-check current database permissions on every protected request.
export const adminOnly = async (request, response, next) => {
  try {
    if (!request.userId) return response.status(401).json({ message: "Authentication required", error: true, success: false });
    const user = await UserModel.findById(request.userId).select("role adminAccess status").lean();
    if (!user || user.status !== "Active" || user.role !== "Admin" || user.adminAccess !== true) {
      return response.status(403).json({ message: "Administrator access required", error: true, success: false });
    }
    return next();
  } catch (error) {
    console.error("Admin authorization error:", error.message);
    return response.status(500).json({ message: "Unable to verify administrator access", error: true, success: false });
  }
};

export default auth;

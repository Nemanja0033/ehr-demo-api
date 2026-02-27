import jwt from "jsonwebtoken";
import prisma from "../../../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET;

// HR ONLY MIDDLEWARE!
export const companyIdMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const hrId = decoded.userId;
    console.log("COMPANY MIDDLEWARE", decoded)

    const company = await prisma.company.findUnique({
      where: {
        hrId,
      },
    });

    req.companyId = company.id;

    next();
  } catch(err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

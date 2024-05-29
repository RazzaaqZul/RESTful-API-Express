import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token.replace("Bearer ", ""),
      },
    });
    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized 2",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};

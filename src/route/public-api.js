import express from "express";
import userController from "../controller/user-controller.js";
// Router-level middleware
// Object ini akan otomatis dipanggil saat melakukan request
const publicRouter = new express.Router();

publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);

// export ke src/web.js
export { publicRouter };

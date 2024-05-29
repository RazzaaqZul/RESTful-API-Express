/*
    untuk Express.js
*/

import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";

export const web = express();

// built-in middleware dari express
// untuk menerima json
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);
// error middleware harus dibawah
web.use(errorMiddleware);

/*
web.use() adalah Application-Level Middleware
*/

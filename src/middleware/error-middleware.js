import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  // Jika tidak ada error
  if (!err) {
    next();
    return;
  }

  // Jika ada error
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else {
    res.status(500);
  }
};

// export ke web.js
export { errorMiddleware };

/*
    Untuk Prisma
*/

import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

export const prismaClient = new PrismaClient({
  // Default nya, ketika melakukan log, prismaClient akan mengirimkan ke terminal/stdout/console.log
  // Kita akan atur, agar dikirim ke winston
  log: [
    // { emit : "stdout", level: "query"} ...
    { emit: "event", level: "query" },
    { emit: "event", level: "error" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
  ],
});

// ketika diganti event
// semua log akan dikirim di $on menjadi winston
prismaClient.$on("error", (e) => {
  // event dikirim ke winston
  logger.error(e);
});

prismaClient.$on("warn", (e) => {
  logger.error(e);
});

prismaClient.$on("info", (e) => {
  logger.error(e);
});

prismaClient.$on("query", (e) => {
  logger.error(e);
});

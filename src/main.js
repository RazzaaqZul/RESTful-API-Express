import { web } from "../src/app/web.js";
import { logger } from "./app/logging.js";

web.listen(3000, () => {
  logger.info("App start");
});

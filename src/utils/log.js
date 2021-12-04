//npm install pino -D

export const Logger = require("pino")({
  level: "debug",
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
});

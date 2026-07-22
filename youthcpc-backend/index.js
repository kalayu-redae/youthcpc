'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');

const AppError = require("./src/utils/appError");
const globalErrorHandler = require('./middlewares/error.controller');
const swaggerSetup = require('./swagger');

const app = express();

swaggerSetup(app);

app.enable("trust proxy");
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hpp({ whitelist: ["id"] }));

// CORS
const corsOptions = process.env.NODE_ENV === "production"
  ? { origin: ["http://localhost:5173", "https://youthcpc.kalayuredae.com"], methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], credentials: true }
  : { origin: ["*"], methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] };
app.use(cors(corsOptions));
app.options(/.*/, cors());

// Logger
if (process.env.NODE_ENV === "development") app.use(morgan("combined"));

// Rate Limiter (skip always)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: () => true
});
app.use(limiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// -------------------
// Module Loader
// -------------------
const modulesPath = path.join(__dirname, 'src', 'modules');

if (fs.existsSync(modulesPath)) {
  fs.readdirSync(modulesPath).forEach((moduleName) => {
    const routesFile = path.join(modulesPath, moduleName, `${moduleName}.routes.js`);

    if (!fs.existsSync(routesFile)) {
      console.warn(`⚠️ Skipping ${moduleName} (no routes file)`);
      return;
    }

    try {
      const router = require(routesFile);

      if (router && typeof router === 'function') {
        app.use(`/api/youthcpc/${moduleName}`, router);
        console.log(`✅ router Module loaded : ${moduleName}`);
      } else {
        console.warn(`⚠️ Invalid router in ${moduleName}`);
      }
    } catch (err) {
      console.error(`❌ Error loading module ${moduleName}: ${err.message}`);
    }
  });
} else {
  console.warn("⚠️ Modules folder not found at", modulesPath);
}

// -------------------
// Root & Error Handling
// -------------------
app.get("/", (req, res) => res.send("<h1>🌟 CPCT Youth Platform🌟</h1>"));

// 404 catch-all
app.use((req, res, next) => next(new AppError(`Can't find ${req.originalUrl},please use valid url`, 404)));

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
'use strict';

const fs = require('fs');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db'); // singleton Sequelize instance

const db = {};

// Recursively load all `.model.js` files
function loadModelsFromDir(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadModelsFromDir(fullPath);
    } else if (stat.isFile() && file.endsWith('.model.js')) {
      try {
        const modelImport = require(fullPath);

        if (typeof modelImport !== 'function') {
          console.warn(`⚠️ Skipping invalid model (not a function): ${fullPath}`);
          return;
        }

        const model = modelImport(sequelize, DataTypes);

        // Avoid duplicate models
        if (db[model.name]) {
          console.warn(`⚠️ Duplicate model skipped: ${model.name}`);
          return;
        }

        db[model.name] = model;
        console.log(`✅ Model Loaded: ${model.name}`);
      } catch (err) {
        console.error(`❌ Error loading model ${fullPath}: ${err.message}`);
      }
    }
  });
}

// Load all models from modules folder
const modulesPath = path.join(__dirname, '../modules');
loadModelsFromDir(modulesPath);

// Set up associations **after all models are loaded**
Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (model.associate && typeof model.associate === 'function') {
    try {
      model.associate(db);
      // console.log(`🔗 Associations set for: ${modelName}`);
    } catch (err) {
      console.error(`❌ Warning setting associations for ${modelName}: ${err.message}`);
    }
  }
});

// Export Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
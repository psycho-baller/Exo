#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// Define the paths to the four util packages
const localApiPath = path.join(ROOT_DIR, 'packages', 'local-api', 'package.json');
const serverApiPath = path.join(ROOT_DIR, 'packages', 'server-api', 'package.json');
const localDbPath = path.join(ROOT_DIR, 'packages', 'local-db', 'package.json');
const serverDbPath = path.join(ROOT_DIR, 'packages', 'server-db', 'package.json');

// Define the desired package names
const defaultLocalApiName = '@rooots/local-api';
const defaultApiName = '@rooots/api';
const localLocalApiName = '@rooots/api';
const localServerApiName = '@rooots/server-api';
const defaultLocalDbName = '@rooots/local-db';
const defaultDbName = '@rooots/db';
const localLocalDbName = '@rooots/db';
const localServerDbName = '@rooots/server-db';

// Get the script argument (if any)
const scriptArg = process.argv[2];

// Function to update the package.json file
function updatePackageJson(filePath, newName) {
  const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  packageJson.name = newName;
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
  console.log(`Updated ${filePath} with name: ${newName}`);
}

// Update package.json files based on the script argument
if (scriptArg === 'local') {
  updatePackageJson(localApiPath, localLocalApiName);
  updatePackageJson(serverApiPath, localServerApiName);
  updatePackageJson(localDbPath, localLocalDbName);
  updatePackageJson(serverDbPath, localServerDbName);
} else {
  updatePackageJson(localApiPath, defaultLocalApiName);
  updatePackageJson(serverApiPath, defaultApiName);
  updatePackageJson(localDbPath, defaultLocalDbName);
  updatePackageJson(serverDbPath, defaultDbName);
}

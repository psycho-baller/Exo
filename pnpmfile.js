function readPackage(packageJson, context) {
  if (packageJson.name === '@orama/orama') {
    context.log('Overriding resolution strategy for @orama/orama')
    packageJson.dependencies = packageJson.dependencies || {}
    console.log("packageJson", packageJson.dependencies)
    packageJson.dependencies['@orama/orama'] = '*'
  }
  return packageJson
}
const fs = require('fs-extra');
const path = require('node:path');

async function afterInstall(opts) {
  const rootDir = opts.prefix;
  console.log('rootDir', rootDir)
  const targetDir = path.join(rootDir, 'apps/expo/node_modules/@orama/orama');
  const sourceDir = path.join(rootDir, 'node_modules/@orama/orama');

  if (fs.existsSync(sourceDir)) {
    await fs.move(sourceDir, targetDir, { overwrite: true });
  }
};

module.exports = {
  hooks: {
    readPackage,
    afterInstall,
  },
}
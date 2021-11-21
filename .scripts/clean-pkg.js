const fs = require('fs');
const path = require('path');

const ORIG_PKG_PATH = path.resolve(__dirname, '../package.json');
const CACHED_PKG_PATH = path.resolve(__dirname, '../../cached-package.json');


// Obtain original `package.json` contents.
const pkgData = require(ORIG_PKG_PATH);




// Write/cache the original `package.json` data to `cached-package.json` file.
fs.writeFile(CACHED_PKG_PATH, JSON.stringify(pkgData), function (err) {
  if (err) throw err;
});

// Remove the specified named scripts from the scripts section.
delete pkgData.devDependencies

// Overwrite original `package.json` with new data (i.e. minus the specific data).
fs.writeFile(ORIG_PKG_PATH, JSON.stringify(pkgData, null, 2), function (err) {
  if (err) throw err;
});
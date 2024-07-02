const fs = require('fs');
const path = require('path');

// Function to update the paths in the HTML file
function updatePaths(filePath, jsFileName, cssFileName) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    // Replace the script and link tags with the new paths
    const result = data
      .replace(/src="\/assets\/index-Dd1PkVfk\.js"/g, `src="./assets/${jsFileName}"`)
      .replace(/href="\/assets\/index-BuU2DAFO\.css"/g, `href="./assets/${cssFileName}"`);

    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) return console.log(err);
      console.log('Paths updated successfully.');
    });
  });
}

// Run the function
const buildDir = path.join(__dirname, 'dist');
const htmlFilePath = path.join(buildDir, 'index.html');

// Specify the filenames of your built JS and CSS files
const jsFileName = 'index-Dd1PkVfk.js';
const cssFileName = 'index-BuU2DAFO.css';

updatePaths(htmlFilePath, jsFileName, cssFileName);

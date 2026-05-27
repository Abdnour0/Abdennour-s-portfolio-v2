const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'images');

fs.readdir(imgDir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
      const inputPath = path.join(imgDir, file);
      const outputFilename = path.basename(file, ext) + '.webp';
      const outputPath = path.join(imgDir, outputFilename);
      
      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath)
        .then(() => console.log(`Converted: ${file} -> ${outputFilename}`))
        .catch(err => console.error(`Error converting ${file}:`, err));
    }
  });
});

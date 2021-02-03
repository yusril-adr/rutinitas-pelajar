/* eslint-disable no-console */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/images');
const exceptionImage = [
  'chrome.png',
  'logo.png',
  'tambah.png',
];

const isResized = (image, extension) => image.endsWith(`-medium.${extension}`) || image.endsWith(`-small.${extension}`);

const isExceptionImage = (image) => exceptionImage.includes(image);

if (!fs.existsSync(target)) {
  fs.mkdirSync(target);
}

console.log('Resizing images ...');
fs.readdirSync(target).forEach((image) => {
  const extension = image.split('.').slice(-1).join('.');

  if (!isResized(image, extension) && !isExceptionImage(image)) {
    // mengubah ukuran gambar dengan lebar 675px, dengan prefix -medium.ext
    sharp(`${target}/${image}`)
      .resize(675)
      .toFile(
        path.resolve(
          __dirname,
          `${target}/${image.split('.').slice(0, -1).join('.')}-medium.${extension}`,
        ),
      );

    // mengubah ukuran gambar dengan lebar 495px, dengan prefix -small.ext
    sharp(`${target}/${image}`)
      .resize(495)
      .toFile(
        path.resolve(
          __dirname,
          `${target}/${image.split('.').slice(0, -1).join('.')}-small.${extension}`,
        ),
      );
  }
});

console.log('Resize images completed.');

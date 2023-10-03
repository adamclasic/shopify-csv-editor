const fs = require('fs');

const { parse: parse2json } = require('csv-parse/sync');
const { parse: parse2csv } = require('json2csv');

const shopifyFinal = [];
let tempImagesArr = [];

const generalSneakersData = fs.readFileSync('./src/generalSneakers.csv', {
  encoding: 'utf8',
  flag: 'r',
});

const generalAllData = fs.readFileSync('./src/generalAllTrue.csv', {
  encoding: 'utf8',
  flag: 'r',
});

const generalSneakers = parse2json(generalSneakersData, {
  columns: true,
  skip_empty_lines: true,
});
// console.log(generalSneakers[1]);

const shopifyAllData = fs.readFileSync('./src/shopifyAll.csv', {
  encoding: 'utf8',
  flag: 'r',
});

const shopifyAll = parse2json(shopifyAllData, {
  columns: true,
  skip_empty_lines: true,
});
// console.log(shopifyAll[1]);

shopifyAll.forEach((initSho) => {
  generalSneakers.forEach((geneElm) => {
    if (geneElm.id == initSho.Handle.split('-')[1]) {
      console.log(`row.id ${geneElm.id} is in both files, collection name is: ${geneElm.model} `);

      initSho['Collection'] = 'MC GOLF SHOES'; // Add Collection (Optional)
      shopifyFinal.push(initSho);
      tempImagesArr = geneElm.images.split(',');
      if (tempImagesArr.length > 1) {
        console.log('has ' + tempImagesArr.length + ' images');
        tempImagesArr.forEach((imgSrc) => {
          if (imgSrc === initSho['Image Src']) return;
          shopifyFinal.push({
            Handle: initSho.Handle,
            'Image Src': imgSrc,
          });
        });
      }
    }
  });
});

const csv = parse2csv(shopifyFinal);

try {
  fs.appendFileSync('./output.MensDressGolf.3.csv', csv);
} catch (err) {
  console.error(err);
}

console.log(csv);
// Warning can not use multiple times in one file as it creates new header colums every time

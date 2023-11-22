const fs = require('fs');

const { parse: parse2json } = require('csv-parse/sync');
const { parse: parse2csv } = require('json2csv');

const shopifyFinal = [];
let tempImagesArr = [];

const generalAllData = fs.readFileSync('./src/2831-1700563185.csv', {
  encoding: 'utf8',
  flag: 'r',
});
const generalAll = parse2json(generalAllData, {
  columns: true,
  skip_empty_lines: true,
});

const collectionNamesData = fs.readFileSync('./src/MC collections help - Sheet1.csv', {
  encoding: 'utf8',
  flag: 'r',
});
const collectionNames = parse2json(collectionNamesData, {
  columns: true,
  skip_empty_lines: true,
});

const shopifyAllData = fs.readFileSync('./src/2831-1700563190-comma-shopify.csv', {
  encoding: 'utf8',
  flag: 'r',
});
const shopifyAll = parse2json(shopifyAllData, {
  columns: true,
  skip_empty_lines: true,
});
// console.log(shopifyAll[1]);

shopifyAll.forEach((shopifyLine) => {
  collectionNames.forEach((coll) => {
    if (shopifyLine.Title === coll.model) {
      shopifyLine['Collection'] = coll['New name'];
    }
  });
  shopifyFinal.push(shopifyLine);
});

const csv = parse2csv(shopifyFinal);

try {
  fs.appendFileSync('./output.test-temp.4.csv', csv);
} catch (err) {
  console.error(err);
}

console.log(csv);
// Warning can not use multiple times in one file as it creates new header colums every time

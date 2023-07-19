const fs = require("fs");

const { parse: parse2json } = require("csv-parse/sync");
const { parse: parse2csv } = require("json2csv");

const shopifyFinal = [];
let tempImagesArr = [];
const generalSneakersData = fs.readFileSync("./src/generalSneakers.csv", {
  encoding: "utf8",
  flag: "r",
});

const generalSneakers = parse2json(generalSneakersData, {
  columns: true,
  skip_empty_lines: true,
});
// console.log(generalSneakers[1]);

const shopifyAllData = fs.readFileSync("./src/shopifyAll.csv", {
  encoding: "utf8",
  flag: "r",
});

const shopifyAll = parse2json(shopifyAllData, {
  columns: true,
  skip_empty_lines: true,
});
// console.log(shopifyAll[1]);

shopifyAll.forEach((initSho) => {
  generalSneakers.forEach((geneElm) => {
    if (geneElm.id == initSho.Handle.split("-")[1]) {
      // console.log(`row.id ${geneElm.id} is in both files, `);

      initSho["Collection"] = "MC SNEAKERS";
      shopifyFinal.push(initSho);
      tempImagesArr = geneElm.images.split(",");
      if (tempImagesArr.length > 1) {
        console.log("has " + tempImagesArr.length + " images");
        tempImagesArr.forEach((imgSrc) => {
          if (imgSrc === initSho["Image Src"]) return;
          shopifyFinal.push({
            Handle: initSho.Handle,
            "Image Src": imgSrc,
          });
        });
      }
    }
  });
});

const csv = parse2csv(shopifyFinal);

try {
  fs.appendFileSync("./output1.0.2.csv", csv);
} catch (err) {
  console.error(err);
}

console.log(csv);

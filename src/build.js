const fs = require("fs");
const util = require("util");
const nunjucks = require("nunjucks");
const { minify } = require("html-minifier");
const parseRecipe = require("./parseRecipe");
const fractionsFilter = require("./fractionsFilter");

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

readDir(`${__dirname}/../recipes`)
  .then((filenames) => {
    return Promise.all(
      filenames.map((filename) => {
        return readFile(`${__dirname}/../recipes/${filename}`, {
          encoding: "utf-8",
        }).then(parseRecipe);
      })
    );
  })
  .then((recipes) => {
    const html = minify(renderRecipes(recipes), {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    });

    fs.writeFileSync(`${__dirname}/../public/index.html`, html);
  });

function renderRecipes(recipes) {
  return new nunjucks.Environment()
    .addFilter("fractions", fractionsFilter)
    .render(`${__dirname}/../views/index.njk`, { recipes });
}

const fs = require("fs");
const util = require("util");
const nunjucks = require("nunjucks");
const { minify } = require("html-minifier");
const parseRecipe = require("./parseRecipe");
const fractionsFilter = require("./fractionsFilter");

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

getRecipes().then(renderRecipes).then(minifyHtml).then(writeHtml);

async function getRecipes() {
  const filenames = await readDir(`${__dirname}/../recipes`);

  const recipes = filenames.map((filename) => {
    return readFile(`${__dirname}/../recipes/${filename}`, {
      encoding: "utf-8",
    }).then(parseRecipe);
  });

  return await Promise.all(recipes);
}

function renderRecipes(recipes) {
  return new nunjucks.Environment()
    .addFilter("fractions", fractionsFilter)
    .render(`${__dirname}/../views/index.njk`, { recipes });
}

function minifyHtml(html) {
  return minify(html, {
    collapseWhitespace: true,
    removeAttributeQuotes: true,
  });
}

function writeHtml(html) {
  fs.writeFileSync(`${__dirname}/../public/index.html`, html);
}

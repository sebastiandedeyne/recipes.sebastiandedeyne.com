const fs = require("fs");
const { promisify } = require("util");

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);

const sluggify = string =>
  string
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");

module.exports = function makePost(title) {
  if (!title) {
    return Promise.reject("No title provided");
  }

  const path = `${__dirname}/../recipes/${sluggify(title)}.md`;

  return exists(path).then(exists => {
    if (exists) {
      return Promise.reject("Recipe already exists");
    }

    return writeFile(path, `# ${title}\n`).then(
      () => "Recipe created successfully"
    );
  });
};

const markdown = require("remark-parse");

function parseRecipe(text) {
  const parser = new markdown.Parser(null, text);

  const recipe = {
    name: "",
    steps: [],
    tags: []
  };

  return parser.parse().children.reduce((recipe, node) => {
    if (node.type === "heading") {
      recipe.name = extractText(node);

      return recipe;
    }

    if (node.type === "list") {
      recipe.steps.push({
        type: "ingredients",
        value: extractIngredients(node)
      });

      return recipe;
    }

    const text = extractText(node);

    recipe.steps.push({
      type: text.startsWith("Source:") ? "source" : "text",
      value: text
    });

    return recipe;
  }, recipe);
}

function extractText(node) {
  if (!node.children) {
    return node.value || "";
  }

  return node.children.reduce((text, child) => {
    return `${text} ${extractText(child)}`.trim();
  }, "");
}

function extractIngredients(node) {
  return node.children.map(extractText).map(parseIngredient);
}

function parseIngredient(ingredient) {
  // prettier-ignore
  const units = [
    "ball", "balls", "cloves", "cup", "g", "gram", "grams", "l", "ml", "oz",
    "tbsp", "tsp"
  ];

  const parts = ingredient.split(
    new RegExp(`^([0-9.,-/+\\s]+(${units.join("|")})?)(\\s+)`)
  );

  return parts.length === 1
    ? { amount: null, name: parts[0] }
    : { amount: parts[1], name: parts[4] };
}

function recipeLoader(source) {
  return `export default ${JSON.stringify(parseRecipe(source))}`;
}

module.exports = recipeLoader;

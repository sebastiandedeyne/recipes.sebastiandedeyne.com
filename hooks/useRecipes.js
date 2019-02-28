const recipesContext = require.context("../recipes", true, /\.md$/);

const recipes = recipesContext.keys().map(filename => {
  return recipesContext(filename).default;
});

export default function useRecipes({ filter }) {
  if (!filter) {
    return recipes;
  }

  return recipes.filter(
    recipe => recipe.searchString.indexOf(filter.toLowerCase()) > -1
  );
}

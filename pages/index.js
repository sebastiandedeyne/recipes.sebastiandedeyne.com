import "../styles/app.css";

import Head from "next/head";
import { useState } from "react";
import Filter from "../components/Filter";
import Recipe from "../components/Recipe";
import useRecipes from "../hooks/useRecipes";

export default function Index() {
  const [filter, setFilter] = useState("");
  const [focussedRecipe, setFocussedRecipe] = useState(null);

  const recipes = useRecipes({ filter });

  function toggleFocussedRecipe(name) {
    if (focussedRecipe === null) {
      setFocussedRecipe(name);
    } else if (focussedRecipe !== name) {
      setFocussedRecipe(null);
    }
  }

  function updateFilter(value) {
    setFilter(value);
    setFocussedRecipe(null);
  }

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="wrapper masonry">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.name}
            blurred={focussedRecipe && focussedRecipe !== recipe.name}
            onClick={() => toggleFocussedRecipe(recipe.name)}
            {...recipe}
          />
        ))}
        <Filter value={filter} onChange={updateFilter} />
      </main>
    </>
  );
}

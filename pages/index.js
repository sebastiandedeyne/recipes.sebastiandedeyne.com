import "../styles/app.css";

import Head from "next/head";
import { useState } from "react";
import Filter from "../components/Filter";
import Recipe from "../components/Recipe";
import useRecipes from "../hooks/useRecipes";

export default function Index() {
  const [filter, setFilter] = useState("");

  const recipes = useRecipes({ filter });

  function updateFilter(value) {
    setFilter(value);
  }

  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="wrapper masonry">
        {recipes.map(recipe => (
          <Recipe key={recipe.name} {...recipe} />
        ))}
        <Filter value={filter} onChange={updateFilter} />
      </main>
    </>
  );
}

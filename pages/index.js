import "../styles/app.css";

import { useState } from "react";

const recipesContext = require.context("../recipes", true, /\.md$/);

const recipes = recipesContext.keys().map(filename => {
  return recipesContext(filename).default;
});

export default function Index() {
  const [focussedRecipe, setFocussedRecipe] = useState(null);

  function toggleFocussedRecipe(name) {
    if (focussedRecipe === name) {
      setFocussedRecipe(null);
    } else {
      setFocussedRecipe(name);
    }
  }

  return (
    <main className="wrapper masonry">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.name}
          blurred={focussedRecipe && focussedRecipe !== recipe.name}
          onClick={() => toggleFocussedRecipe(recipe.name)}
          {...recipe}
        />
      ))}
    </main>
  );
}

function Recipe({ name, steps, blurred, onClick }) {
  return (
    <article
      className={`recipe ${blurred ? "is-blurred" : ""}`}
      onClick={onClick}
    >
      <h1>{name}</h1>
      {steps.map((step, i) => (
        <Step key={i} {...step} />
      ))}
    </article>
  );
}

function Step({ type, value }) {
  switch (type) {
    case "ingredients":
      return (
        <ul>
          {value.map((ingredient, i) => (
            <li key={i}>
              <span className="ingredient-amount">{ingredient.amount}</span>
              <span className="ingredient-name">{ingredient.name}</span>
            </li>
          ))}
        </ul>
      );
    case "text":
      return <p>{value}</p>;
    case "source":
      return <p className="source">{value}</p>;
  }
}

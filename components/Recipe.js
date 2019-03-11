export default function Recipe({ name, steps, source }) {
  return (
    <article className="recipe">
      <h1>{name}</h1>
      <ol>
        {steps.map((step, i) => (
          <li key={i}>
            <Step {...step} />
          </li>
        ))}
      </ol>
      {source && <p className="source">From {source}</p>}
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

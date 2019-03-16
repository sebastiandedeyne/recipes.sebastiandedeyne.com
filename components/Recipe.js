export default function Recipe({ name, steps, source }) {
  return (
    <article className="recipe">
      <h1>{name}</h1>
      <ol>
        {steps.map((step, i) => (
          <li key={i}>
            {step.type === "ingredients" ? (
              <ul>
                {step.contents.map((ingredient, i) => (
                  <li key={i}>
                    <span className="ingredient-amount">
                      {ingredient.amount
                        ? replaceFractions(ingredient.amount)
                        : null}
                    </span>
                    <span className="ingredient-name">{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{step.contents}</p>
            )}
          </li>
        ))}
      </ol>
      {source ? <Source source={source} /> : null}
    </article>
  );
}

function Source({ source }) {
  let sourceDomain = "";

  if (source.startsWith("https://")) {
    sourceDomain = source
      .substr("https://".length, source.length)
      .split("/")[0];
  }

  return (
    <p className="source">
      From {sourceDomain ? <a href={source}>{sourceDomain}</a> : source}
    </p>
  );
}

function replaceFractions(string) {
  return string
    .replace("1/2", "½")
    .replace("1/3", "⅓")
    .replace("2/3", "⅔")
    .replace("1/4", "¼")
    .replace("3/4", "¾")
    .replace("1/5", "⅕")
    .replace("2/5", "⅖")
    .replace("3/5", "⅗")
    .replace("4/5", "⅘");
}

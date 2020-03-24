window.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  document.querySelector(".filter").focus();
});

document.querySelector(".filter").addEventListener("input", (event) => {
  Array.from(document.querySelectorAll(".recipe")).forEach((recipe) => {
    if (!event.target.value) {
      recipe.classList.remove("hidden");
      return;
    }

    if (
      recipe.dataset.searchString.indexOf(event.target.value.toLowerCase()) > -1
    ) {
      recipe.classList.remove("hidden");
    } else {
      recipe.classList.add("hidden");
    }
  });
});

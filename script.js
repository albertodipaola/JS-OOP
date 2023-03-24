let games;

fetch("https://api.rawg.io/api/games?key=9af72c943356453fb08b37b3f1f9a18a")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data.results);
    games = data.results;
    renderGames(data.results);
    renderCategories(data.results);
  });

function renderGames(games) {
  let gameContainer = document.querySelector("#game-container");
  gameContainer.innerHTML = "";

  games.forEach((game) => {
    let col = document.createElement("div");
    col.classList.add("col-12", "col-md-3", "my-3");
    col.innerHTML = `
            <div class="card">
            <img src="${game.background_image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${game.name}</h5>
                <a href="#" class="btn btn-primary">Dettagli</a>
            </div>
            </div>
        `;
    gameContainer.appendChild(col);
  });
}

function renderCategories(games) {
  let categories = Array.from(
    new Set(
      games
        .map((game) => game.genres)
        .map((genre) => genre.map((el) => el.name))
        .flat()
    )
  );

  let categoriesDropdown = document.querySelector("#categories-dropdown");
  categories.forEach((category) => {
    let categoryItem = document.createElement("li");
    categoryItem.innerHTML = `<button class="dropdown-item btn-category">${category}</button>`;
    categoriesDropdown.appendChild(categoryItem);

    categoryItem.addEventListener("click", () => gameByCategory(category));
  });
}

function gameByCategory(genre) {
  console.log(games[0].genres);
  let gameCategories = games.filter(
    (game) => game.genres.filter((el) => el.name == genre).length > 0
  );
  renderGames(gameCategories);
}

// Get reference to the characters container element
let charactersContainer = document.getElementById("characters-container");
let apiKey = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa";

// Function to fetch data from Marvel API
async function fetchData() {
  const response = await fetch(apiKey);
  const data = await response.json();
  return data;
}

// Function to retrieve favorite data from local storage
function getStorage() {
  let data = JSON.parse(localStorage.getItem("favorite")) || [];
  return data;
}

// Fetch data from Marvel API and render characters
fetchData()
  .then((data) => {
    let favoriteData = getStorage();
    let arr = data.data.results;
    charactersContainer.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
      let favorite = "favorite";

      // Check if the character is in favorites
      for (let j = 0; j < favoriteData.length; j++) {
        if (arr[i].id == favoriteData[j].id) {
          favorite = "UnFavorite";
          break;
        }
      }

      const { id, thumbnail, name } = arr[i];
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
      let path = `views/info/info.html#${id}`;
  
      // Dynamically create HTML content for character card
      div.innerHTML = `
        <img class="poster" src=${thumbnail.path}.jpg alt="">
        <div class="card-body">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavorite(this)"/>
        </div>
      `;
      charactersContainer.appendChild(div);
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Get reference to search button, search box, and search result container
let searchBtn = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");

// Event listener for search button click
searchBtn.addEventListener("click", () => {
  let query = searchBox.value;
  searchBox.value = "";

  // Construct URL for Marvel API search
  let url = `https://gateway.marvel.com/v1/public/characters?name=${query}&ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;

  // Fetch data from Marvel API based on search query
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let result = data.data.results[0];
      const { id, name, thumbnail } = result;

      let favoriteData = getStorage();

      let favorite = "Add Favorite";
      for (let j = 0; j < favoriteData.length; j++) {
        if (result.id == favoriteData[j].id) {
          favorite = "Remove Favorite";
          break;
        }
      }

      // Clear previous search results
      searchResult.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.innerText = "Search results :";
      h2.style.color = 'white'
      searchResult.appendChild(h2);

      // Dynamically create HTML content for search result
      let div = document.createElement("div");
      div.classList.add("character-card");
      div.setAttribute("id", id);
      let path = `info/info.html#${id}`;
      div.innerHTML = `
        <img class="poster" src=${thumbnail.path}.jpg alt="">
        <div class="card-body">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavorite(this)"/>
        </div>
      `;
      searchResult.appendChild(div);
    })
    .catch((error) => {
      console.error(error);
    });
});

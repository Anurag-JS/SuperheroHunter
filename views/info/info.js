// Function to execute when the window is loaded
window.onload = function () {
    // Get reference to the character wrapper element
    let wrapper = document.getElementById("characterWrapper");
  
    // Extract character ID from URL or set default ID
    let winurl = window.location.href;
    let id = winurl.substring(winurl.lastIndexOf("#") + 1) || 1017100;
  
    // Fetch character data from Marvel API
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Extract character information
        let character = data.data.results[0];
        const {name, description, thumbnail} = character;
        // Create HTML structure for character information
        let div = document.createElement("div");
        div.classList.add("character-info-container");
  
        div.innerHTML = `
          <div class="character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="character-info white-text">
            <h3>${name}</h3>
            <br>
            <p>${description || "description not found"}</p>
          </div>
        `;
        // Clear existing content and append new character information
        wrapper.innerHTML = "";
        wrapper.appendChild(div);
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Get reference to the comics wrapper element
    let comicsWrapper = document.getElementById("comics");
    comicsWrapper.innerHTML = "";
  
    // Fetch comics data for the character from Marvel API
    url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=d51901e0cddf18f727fd9890c85bf119&hash=3c0807be06a02606d35aa7c35b9635aa`;
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // Extract comics information
        let comics = res.data.results;
        // Loop through comics and render each one
        for (let comic of comics) {
          const { title, thumbnail, description } = comic;
          // Create HTML structure for comic information
          let div = document.createElement("div");
          div.classList.add("comic-character-info-container");
  
          div.innerHTML = `
          <div class="comic-character-poster">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="comic-character-info white-text">
            <h3>${title}</h3>
            <br>
            <p>${description || "description not found"}</p>
          </div>
        `;
          // Append comic information to the comics wrapper
          comicsWrapper.appendChild(div);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
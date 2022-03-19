const endpoint = "http://localhost:3000/playlist";
const filterEndpoint = ["http://localhost:3000/genre/", "/playlists"];

let home = `<div id="playlist_list"></div>`;

let create = `
<div id="form-errors"></div>
<form>
<label for="playlist-name">Playlist name:</label><br>
<input type="text" id="playlist-name" name="playlist-name" required><br>

<label for="curator">Curator:</label><br>
<input type="text" id="curator" name="lname" required><br><br>

<label for="email">Email:</label><br>
<input type="text" id="email" name="email"><br><br>

<label for="location">Location:</label><br>
<input type="text" id="location" name="location"><br><br>

<label for="genres" required>Genres:</label><br>
<input type="text" id="genres" name="genres"><br><br>

<label for="description">Description:</label><br>
<input type="text" id="description" name="description"><br><br>

<label for="playlist-link">Playlist link:</label><br>
<input type="text" id="playlist-link" name="playlist-link"><br><br>

<label for="website">website:</label><br>
<input type="text" id="website" name="website"><br><br>

<label for="facebook">facebook:</label><br>
<input type="text" id="facebook" name="facebook"><br><br>

<label for="twitter">twitter:</label><br>
<input type="text" id="twitter" name="twitter"><br><br>

<label for="instagram">instagram:</label><br>
<input type="text" id="instagram" name="instagram"><br><br>

<label for="youtube">youtube:</label><br>
<input type="text" id="youtube" name="youtube"><br><br>

<label for="reddit">reddit:</label><br>
<input type="text" id="reddit" name="reddit"><br><br>

<label for="patreon">patreon:</label><br>
<input type="text" id="patreon" name="patreon"><br><br>

<label for="sound_cloud">sound_cloud:</label><br>
<input type="text" id="sound_cloud" name="sound_cloud"><br><br>

<label for="submit_hub">submit_hub:</label><br>
<input type="text" id="submit_hub" name="submit_hub"><br><br>

<label for="linked_in">linked_in:</label><br>
<input type="text" id="linked_in" name="linked_in"><br><br>

<label for="submission_page">reddit:</label><br>
<input type="text" id="submission_page" name="submission_page"><br><br>



<input id="form-submit" type="submit" value="Submit">
</form> `;

var current_playlist_range = [0, 26];

window.onload = function () {
  let search_button = document.getElementById("search_bar");

  search_button.addEventListener("click", function () {
    document.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchGenre();
      }
    });
  });

  let divSubmit = document.getElementById("user-comments-submit");
  divSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    displayContentDiv();
  });

  let homeButton = document.getElementById("home-button");
  homeButton.addEventListener("click", function (event) {
    event.preventDefault();
    renderPage(home);
    getPlaylists();
  });

  let createButton = document.getElementById("create-button");
  createButton.addEventListener("click", function (event) {
    event.preventDefault();
    renderPage(create);
    formPage();
    addSubmitEvent();
  });

  getPlaylists();
};

function addSubmitEvent() {
  let submitButton = document.getElementById("form-submit");
  submitButton;

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    createNewPlaylist();
  });
}

function getPlaylists() {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then((requests) => {
      //debugger
      requests.forEach((request) => {
        let newPlaylist = new Playlist(request);
        //debugger
      });
      renderPlaylistSlice(current_playlist_range[0], current_playlist_range[1]);
    });
}

function next25Playlists(arg1, arg2) {
  if (current_playlist_range[1] >= Playlist.all.length) {
  } else if (current_playlist_range[1] + 25 <= 0) {
    renderPlaylistSlice(
      (current_playlist_range[0] += 25),
      (current_playlist_range[1] = Playlist.all.length)
    );
  } else {
    renderPlaylistSlice(
      (current_playlist_range[0] += 25),
      (current_playlist_range[1] += 25)
    );
  }
}

function prev25Playlists() {
  if (current_playlist_range[0] <= 0) {
  } else if (current_playlist_range[0] - 25 <= 0) {
    renderPlaylistSlice(
      (current_playlist_range[0] = 0),
      (current_playlist_range[1] = 26)
    );
  } else {
    renderPlaylistSlice(
      (current_playlist_range[0] -= 25),
      (current_playlist_range[1] -= 25)
    );
  }
}

function renderPlaylistSlice(arg1, arg2) {
  clearList();
  Playlist.all.slice(arg1, arg2).forEach((playlist) => {
    playlist.renderPlaylist();
  });
}

function clearList() {
  let list = document.getElementById("playlist_list");
  list.innerHTML = "";
}

function searchGenre() {
  Playlist.all = [];
  let searchContent = document.getElementById("search_bar").value;

  let genreEndPoint = filterEndpoint[0] + searchContent + filterEndpoint[1];

  fetch(genreEndPoint)
    .then(function (response) {
      return response.json();
    })
    .then((requests) => {
      requests.forEach((request) => {
        let newPlaylist = new Playlist(request);
      });
      current_playlist_range[0] = 0;
      current_playlist_range[1] = 26;

      renderPlaylistSlice(current_playlist_range[0], current_playlist_range[1]);
    });
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

function highlighter(string, search) {
  if (string.includes(search)) {
    array = string.split(", ");
    elementI = array.findIndex(search);
    array[elementI] = `<em>` + array[elementI] + `</em>`;
    newString = array.join(", ");
    return newString;
  }
}

function renderPage(page) {
  body = document.getElementById("body");
  body.innerHTML = page;
}

function homePage() {
  let search_button = document.getElementById("search_bar");

  search_button.addEventListener("click", function () {
    document.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchGenre();
      }
    });
  });
  getPlaylists();
}

function formPage() {
  let submitButton = document.getElementById("form-submit");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    createNewPlaylist();
  });
}

function createNewPlaylist() {
  //validation
  let requireFields = ["playlist-name", "curator", "genres", "description"];

  if (
    requireFields.every(
      (name) => document.getElementById(name).value.trim() != ""
    )
  ) {
    let playlistObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: document.getElementById("playlist-name").value,
        curator: document.getElementById("curator").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        genres_string: document.getElementById("genres").value,
        description: document.getElementById("description").value,
        playlist_page: document.getElementById("playlist-link").value,
        website: document.getElementById("website").value,
        facebook: document.getElementById("facebook").value,
        twitter: document.getElementById("twitter").value,
        instagram: document.getElementById("instagram").value,
        youtube: document.getElementById("youtube").value,
        reddit: document.getElementById("reddit").value,
        patreon: document.getElementById("patreon").value,
        sound_cloud: document.getElementById("sound_cloud").value,
        submit_hub: document.getElementById("submit_hub").value,
        linked_in: document.getElementById("linked_in").value,
        submission_page: document.getElementById("submission_page").value,
      }),
    };
    fetch("http://localhost:3000/playlist/new", playlistObject);
  } else {
    document.getElementById(
      "form-errors"
    ).innerHTML = `<h6>Please fill out minimum required info</h6><p>${requireFields}</p>`;
    scrollToTop();
  }
}

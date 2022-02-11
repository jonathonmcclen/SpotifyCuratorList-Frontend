window.onload = function(){
    let submitButton = document.getElementById("form-submit")
    submitButton

    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        createNewPlaylist()
    })
};

function createNewPlaylist(){
    
    let playlistObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
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
        })
    };
    fetch( "http://localhost:9393/playlist/new", playlistObject);
}
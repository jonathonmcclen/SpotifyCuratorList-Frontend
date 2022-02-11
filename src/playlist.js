class Playlist {

    constructor(playlstJSON){
        this.id = playlstJSON.id
        this.name = playlstJSON.name
        this.description = playlstJSON.description
        this.name  = playlstJSON.name
        this.curator = playlstJSON.curator
        this.email = playlstJSON.email
        this.location = playlstJSON.location
        this.genres_string = playlstJSON.genres_string
        this.followers = playlstJSON.followers
        this.songs = playlstJSON.songs
        this.spotify_playlist_page = playlstJSON.spotify_playlist_page
        this.description = playlstJSON.description
        this.website = playlstJSON.website
        this.facebook = playlstJSON.facebook
        this.twitter = playlstJSON.twitter
        this.instagram = playlstJSON.instagram
        this.youtube = playlstJSON.youtube
        this.reddit = playlstJSON.reddit
        this.patreon = playlstJSON.patreon
        this.sound_cloud = playlstJSON.sound_cloud
        this.submit_hub = playlstJSON.submit_hub
        this.linked_in = playlstJSON.linked_in
        this.submission_page = playlstJSON.submission_page
        Playlist.all.push(this)
    }

    renderPlaylist() {
        let list = document.getElementById("playlist_list")
        //let newListItem = document.createElement("li")

        let playlistContent = `<div class="playlist_frame">
            <h4>${this.name}</h4>
            <h5>CURATOR: ${this.curator}</h5>
            <p>Genres: ${this.genres_string}</p>
            <p>DESCRIPTION: ${this.description.substring(0,100)}</p>
            <p>SONGS: ${this.songs}</p>
            <p>FOLLOWERS: ${this.followers}</p>
            <br>
            <button>+</button>
            <button>DELETE</button>
            <button>EDIT</button>
        </div>`
        
        list.innerHTML += playlistContent
        //list.appendChild(newListItem);
        //debugger
    }
    
}

Playlist.all = []
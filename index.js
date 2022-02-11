const endpoint = "http://localhost:9393/playlist"
const filterEndpoint = ["http://localhost:9393/genre/", "/playlists"]

var current_playlist_range = [0,26]

window.onload = function(){
    let search_button = document.getElementById("search_bar")
    search_button.addEventListener('click',function(){ 
        document.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
              searchGenre()
            }
        });
    })

    
    getPlaylists();
    
};

function getPlaylists() {
    fetch(endpoint)
    .then (function(response) {
        return response.json()
    })
    .then(requests => {
        //debugger
        requests.forEach(request => {
            let newPlaylist = new Playlist(request)
            //debugger
        })
        renderPlaylistSlice(current_playlist_range[0],current_playlist_range[1]);
    })
};

function next25Playlists(arg1,arg2){
    if (current_playlist_range[1] >= Playlist.all.length){

    } else if (current_playlist_range[1] + 25 <= 0){
        renderPlaylistSlice(current_playlist_range[0] += 25, current_playlist_range[1] = Playlist.all.length)
    } else {
        renderPlaylistSlice(current_playlist_range[0] += 25,current_playlist_range[1] += 25 )
    }
}

function prev25Playlists(){
    if (current_playlist_range[0] <= 0){

    } else if (current_playlist_range[0] - 25 <= 0){
        renderPlaylistSlice(current_playlist_range[0] = 0, current_playlist_range[1] = 26 )
    } else {
        renderPlaylistSlice(current_playlist_range[0] -= 25, current_playlist_range[1] -= 25 ) 
    }
}

function renderPlaylistSlice(arg1,arg2){
    clearList()
    Playlist.all.slice(arg1, arg2).forEach( playlist => {
        playlist.renderPlaylist();
    })
}

function clearList(){
    let list = document.getElementById("playlist_list")
    list.innerHTML = ""
}

function searchGenre(){
    Playlist.all = []
    let searchContent = document.getElementById("search_bar").value

    let genreEndPoint = filterEndpoint[0] + searchContent + filterEndpoint[1]

    fetch(genreEndPoint)
    .then (function(response) {
        return response.json()
    })
    .then(requests => {
        requests.forEach(request => {
            let newPlaylist = new Playlist(request)
        })
        current_playlist_range[0] = 0
        current_playlist_range[1] = 26
        
        renderPlaylistSlice(current_playlist_range[0],current_playlist_range[1]);
    })
}

function scrollToTop(){
    window.scrollTo(0, 0)
}

function highlighter(string, search){
    if (string.includes(search)){
        array = string.split(", ")
        elementI = array.findIndex(search)
        array[elementI] = `<em>` + array[elementI] + `</em>`
        newString = array.join(", ")
        return newString
    }
}


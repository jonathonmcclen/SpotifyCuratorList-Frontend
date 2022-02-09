const endpoint = "http://localhost:9393/playlsts"
const endpoint = "http://localhost:9393/genres/  /playlists"

window.onload = function(){
    let search_button = document.getElementById("")
    search_button.addEventListener('click',function(){ })
};



function populateAllPlaylists(){
    Playlist.all
}



function getRequests() {
    fetch(endpoint)

    .then (function(response) {
        return response.json()
    })

    .then(requests => {
        requests.data.forEach(request => {
            let newRequest = new Request(request, request.attributes)
            document.querySelector("#requests-container").innerHTML += newRequest.renderRequest()
            addHeartListener()
        })
    })

};



function postFetch(name, description, category) {
    console.log(name, description, category)
    fetch(endpoint, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            description: description,
            category_id: category
        })
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(object) {
        let newRequest = new Request(object, object)
        document.querySelector("#requests-container").innerHTML += newRequest.renderRequest()
        addHeartListener()
    })
    .catch(function(error) {
        console.log(error)
      })
}

function patchVote(request) {
    let submitValue 
    if (request.value == "true") {
        submitValue = "false"
    } else {
        submitValue = "true"
    }
    fetch(endpoint + `/${request.id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            vote: submitValue
        })
    }).then(function(response) {
        return response.json()
    })
    .then(function(object) {
        document.querySelector("#requests-container").innerHTML = ""
        getRequests()
        addHeartListener()
    })
}
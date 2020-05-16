



function createPlayerNameFields() {
  
    var playersDiv = document.getElementById("playerNames");

    var amountOfDivs = playersDiv.getElementsByTagName("input").length;

    //Get value from field
    var amountOfPlayers= parseInt(document.getElementById("players").value);

    //Calculate difference of actual input fields and desired
    var difference = amountOfPlayers-amountOfDivs;

    //add fields if more fields are required
    for (let i = 0; i < difference; i++) {
        var label = document.createElement("label")
        label.innerHTML="Player " + ((amountOfPlayers)+i);
        var inputField = document.createElement("input")
        inputField.type = "text"
        inputField.name = "player"+(amountOfPlayers+i);
        inputField.id="player"+(amountOfPlayers+i);

      playersDiv.appendChild(label);
       playersDiv.appendChild(inputField);
        playersDiv.appendChild(document.createElement("br"));
    }

    //Delete fields if required
    difference = -difference;
    for (let i = 0; i < difference; i++) {
        playersDiv.removeChild(playersDiv.lastChild);
        playersDiv.removeChild(playersDiv.lastChild);
        playersDiv.removeChild(playersDiv.lastChild);
    }
}


async function prepareDraft() {

    var playersArray =  getAllPlayers();
  console.log(playersArray);
    var fifaPlayers = await loadFifaPlayers();
    console.log(fifaPlayers);
}

 function getAllPlayers(){
    
    var playersArray = [];
    var playersDiv = document.getElementById("playerNames").getElementsByTagName("input");
    Array.from(playersDiv).forEach(element => {
       playersArray.push([element.id,element.value ]);
    });

    return playersArray;
}




 function loadFifaPlayers(){
    return new Promise(resolve => {
        var data;
    
        const fileSelector = document.getElementById('file-selector');

          const file = fileSelector.files[0];
          Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function(results) {
              data = results;
              resolve(data)
            }
          });
    })
  
}


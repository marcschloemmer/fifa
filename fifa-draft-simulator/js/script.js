let fifaPlayersLB;
let fifaPlayersGK;
let fifaPlayersRB;
let fifaPlayersCM;
let fifaPlayersCB;
let fifaPlayersLM;
let fifaPlayersRM;
let fifaPlayersST;




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

    //split players in different arrays
    preparePlayerArrays(fifaPlayers.data)


    //load draft html
    
}

 function getAllPlayers(){
    
    var playersArray = [];
    var playersDiv = document.getElementById("playerNames").getElementsByTagName("input");
    Array.from(playersDiv).forEach(element => {
       playersArray.push([element.id,element.value ]);
    });

    //Shuffle array
    for(let i = playersArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = playersArray[i]
        playersArray[i] =playersArray[j]
        playersArray[j] = temp
      }

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


function preparePlayerArrays(fifaPlayers){
     //delete players below 80 rating
     fifaPlayers = fifaPlayers.filter(element => element.overall >80);
    
    //get first position
    for (let i = 0; i < fifaPlayers.length; i++) {
        
        try {
            const element = fifaPlayers[i];
            element.player_positions = element.player_positions.split(',')[0];
        } catch (error) {
            console.log("fehler",fifaPlayers[i-1]);
        }
  
    }
   
    console.log(fifaPlayers);

    //split up players in arrays based on position
    fifaPlayersGK = fifaPlayers.filter(element => element.player_positions == "GK");
    fifaPlayersLB = fifaPlayers.filter(function (element){
        return element.player_positions == "LB" || element.player_positions == "LWB";
    } );
    fifaPlayersCB = fifaPlayers.filter(element => element.player_positions == "CB");
    fifaPlayersRB = fifaPlayers.filter(function (element){
        return element.player_positions =="RB" || element.player_positions == "RWB"
    } );
    fifaPlayersCM = fifaPlayers.filter(function (element){
        return element.player_positions =="CDM" || element.player_positions == "CM" || element.player_positions == "CAM"
    } );
    fifaPlayersLM =fifaPlayers.filter(function (element){
        return element.player_positions =="LM" || element.player_positions == "LF" || element.player_positions == "LW" || element.player_positions == "LS"
    } );

    fifaPlayersRM = fifaPlayers.filter(function (element){
        return element.player_positions =="RM" || element.player_positions == "RF" || element.player_positions == "RW" || element.player_positions == "RS"
    } );
    fifaPlayersST = fifaPlayers.filter(function (element){
        return element.player_positions =="CF" || element.player_positions == "ST"
    } );

    console.log(fifaPlayersGK);
    console.log(fifaPlayersLB);
    console.log(fifaPlayersCB);
    console.log(fifaPlayersRB);
    console.log(fifaPlayersCM);
    console.log(fifaPlayersLM);
    console.log(fifaPlayersRM);
    console.log(fifaPlayersST);

}


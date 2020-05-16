let fifaPlayersLB;
let fifaPlayersGK;
let fifaPlayersRB;
let fifaPlayersCM;
let fifaPlayersCB;
let fifaPlayersLM;
let fifaPlayersRM;
let fifaPlayersST;
let playersArray;
let currentRound=1;
let currentPlayerNumber=0;
let currentPlayer;
let selectedPosition;


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

    document.getElementById("startDraft").style.display="none";

     playersArray =  getAllPlayers();
    console.log(playersArray);

    var fifaPlayers = await loadFifaPlayers();

    //split players in different arrays
    preparePlayerArrays(fifaPlayers.data)


    //load draft html
    loadDraftHTML();
}

 function getAllPlayers(){
    
    var playersArray = [];
    var playersDiv = document.getElementById("playerNames").getElementsByTagName("input");
    Array.from(playersDiv).forEach(element => {
       playersArray.push({"name": element.value} );
    });

    //Shuffle array
    for(let i = playersArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = playersArray[i]
        playersArray[i] =playersArray[j]
        playersArray[j] = temp
      }

    //add available positions for each player
    playersArray.forEach(element => {
        element.availablePositions= ["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"];
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

    // console.log(fifaPlayersGK);
    // console.log(fifaPlayersLB);
    // console.log(fifaPlayersCB);
    // console.log(fifaPlayersRB);
    // console.log(fifaPlayersCM);
    // console.log(fifaPlayersLM);
    // console.log(fifaPlayersRM);
    // console.log(fifaPlayersST);

}


function loadDraftHTML(){

   document.getElementById("selectPosition").style.display="block";


   loadPositions();
}

function changeCurrentPlayer(){
    //change current player plus one. if the number is not higher than max number
    //-1 when max number

    //check if 1 round is over


    //Check if 11 rounds are over, if so , call mix all players together
}

function mixAllPlayersTogether(){
    //mix all players into 1 big array
}

function loadPositions(){
    var draftWindow = document.getElementById("draftWindow");
     currentPlayer = playersArray[currentPlayerNumber];
    document.getElementById("playerName").innerHTML = currentPlayer.name;
    document.getElementById("selectPosition").display="block";

   
    currentPlayer.availablePositions.forEach(element => {
        theInput = document.createElement("input");
        theInput.setAttribute('type',"radio");
        theInput.setAttribute('name',"position");
        theInput.setAttribute('value',element);
        label = document.createElement( 'label');
        label.innerHTML += "<span> " + element + "</span>";
        draftWindow.appendChild(theInput);
        draftWindow.appendChild(label)
        draftWindow.appendChild(document.createElement("br"));
    });

}

function displayPlayers(){
    document.getElementById("selectPosition").style.display="none";
    document.getElementById("selectPlayer").style.display="block";

   var els =  document.getElementsByName("position");
   for (var i=0;i<els.length;i++){
    if ( els[i].checked ) {
    selectedPosition = els[i].value;
    }
  }

   //delte selected position from available positions
   currentPlayer.availablePositions = currentPlayer.availablePositions.filter(element => element !== selectedPosition);

  //get corresponding array
  var selectedPositionCut = selectedPosition.substring(0,2);
  console.log(selectedPositionCut);
  console.log(eval("fifaPlayers"+selectedPositionCut));
   //display 5 random players from corresponding list
   for (let i = 0; i < 5; i++) {
       console.log(eval("fifaPlayers"+selectedPositionCut)[Math.floor(Math.random() * eval("fifaPlayers"+selectedPositionCut).length)]) ;
   }
   
}
   function playerSelected(){
console.log(currentPlayer);

    //Get selected player

    //delete the player form the array

    //call cahnge current player 

   }
   


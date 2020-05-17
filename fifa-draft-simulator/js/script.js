let fifaPlayersLB;
let fifaPlayersGK;
let fifaPlayersRB;
let fifaPlayersCM;
let fifaPlayersCB;
let fifaPlayersLM;
let fifaPlayersRM;
let fifaPlayersST;
let fifaPlayersDefender;
let fifaPlayersMidfielder;
let playersArray;
let currentRound=1;
let currentPlayerNumber=0;
let currentPlayer;
let selectedPosition;
let displayedPlayers = [];
let selectedPlayer;
let selectedPositionCut;
let amountOfPlayers;
let firstTimeOverEleven = true;

function createPlayerNameFields() {
  
    var playersDiv = document.getElementById("playerNames");

    var amountOfDivs = playersDiv.getElementsByTagName("input").length;

    //Get value from field
    amountOfPlayers= parseInt(document.getElementById("players").value);

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
        element.selectedPlayers=[];
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
   displaySelectedTeam();
}

function changeCurrentPlayer(){
    //check if even or odd round
    var roundNumberEven = currentRound %2 == 0? true:false;
    
    //check if round is over and how to count next player
    if((currentPlayerNumber+1)<amountOfPlayers && !roundNumberEven){
        console.log("playernumber plus");
        currentPlayerNumber++;
    }
    
    else if((currentPlayerNumber-1) >=0 && roundNumberEven){
        currentPlayerNumber--;
        console.log("playernumber --");
    }
    else{
        currentRound ++;
        console.log("new Round");
    }
    
    //Check if 11 rounds are over, if so , call mix all players together
    if(currentRound > 11 && firstTimeOverEleven){
        prepareSubs();
        firstTimeOverEleven = false;
    }
    
    //check if draft is done
    if(currentRound > 18){
        alert("draft is done");   
    } 
    loadPositions();
    displaySelectedTeam();
}



function loadPositions(){
    var draftWindow = document.getElementById("draftWindow");
     currentPlayer = playersArray[currentPlayerNumber];
    document.getElementById("playerName").innerHTML = currentPlayer.name;
    document.getElementById("playerName2").innerHTML = "Current Team: " +currentPlayer.name;
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


        //get checked checkbox
   var els =  document.getElementsByName("position");
   for (var i=0;i<els.length;i++){
    if ( els[i].checked ) {
    selectedPosition = els[i].value;
    }
  }

   //delte selected position from available positions
   currentPlayer.availablePositions = currentPlayer.availablePositions.filter(element => element !== selectedPosition);

  //get corresponding array
  if(currentRound<=11){
    selectedPositionCut = selectedPosition.substring(0,2);
  console.log(selectedPositionCut);
  }
  //after 11 positions, new arrays, therefore no cut
  else {
    selectedPositionCut = selectedPosition.replace(/[0-9]/g, '');;
  }
  
  //console.log(eval("fifaPlayers"+selectedPositionCut));
   //display 5 random players from corresponding list
   for (let i = 0; i < 5; i++) {
       var index = eval("fifaPlayers"+selectedPositionCut).indexOf(eval("fifaPlayers"+selectedPositionCut)[Math.floor(Math.random() * eval("fifaPlayers"+selectedPositionCut).length)] );
       console.log(index);
       displayedPlayers.push(eval("fifaPlayers"+selectedPositionCut).splice(index,1))
   }
 
   //delete positions radio buttons
   var draftWindow = document.getElementById("draftWindow");
   while (draftWindow.firstChild){
       draftWindow.removeChild(draftWindow.firstChild);
   }
   //display players
   displayedPlayers.forEach(element => {
  //  console.log(element);
    theInput = document.createElement("input");
    theInput.setAttribute('type',"radio");
    theInput.setAttribute('name',"player");
    theInput.setAttribute('value',element[0].sofifa_id);
    label = document.createElement( 'label');
    label.innerHTML += "<span> " + element[0].short_name + ", Club: " + element[0].club + ", Rating: " + element[0].overall + "</span>";
    draftWindow.appendChild(theInput);
    draftWindow.appendChild(label)
    draftWindow.appendChild(document.createElement("br"));
   });
}
function playerSelected(){
    document.getElementById("selectPosition").style.display="block";
    document.getElementById("selectPlayer").style.display="none";


    //Get selected player
    var els =  document.getElementsByName("player");
    for (var i=0;i<els.length;i++){
     if ( els[i].checked ) {
    selectedPlayer = els[i].value;
    }
}

console.log(selectedPlayer);
//push remaining players back into array and
//add selected player to current Players'array of selected players

displayedPlayers.forEach(element => {
    element[0].sofifa_id != selectedPlayer ? eval("fifaPlayers"+selectedPositionCut).push(element[0]):playersArray[currentPlayerNumber].selectedPlayers.push(element[0]);

});

console.log("after pushing players back", eval("fifaPlayers"+selectedPositionCut));
console.log("after adding player to player",playersArray[currentPlayerNumber] );

//clear all arrays
displayedPlayers = [];

//delete players radio buttons
var draftWindow = document.getElementById("draftWindow");
while (draftWindow.firstChild){
    draftWindow.removeChild(draftWindow.firstChild);
} 

//change current player
changeCurrentPlayer()

}

function prepareSubs(){
    //mix defenders, midfields, strikers together
    fifaPlayersDefender = fifaPlayersLB.concat(fifaPlayersCB);
    fifaPlayersDefender = fifaPlayersDefender.concat(fifaPlayersRB);
    console.log(fifaPlayersDefender);

    fifaPlayersMidfielder = fifaPlayersLM.concat(fifaPlayersCM);
    fifaPlayersMidfielder = fifaPlayersMidfielder.concat(fifaPlayersRM);
    console.log(fifaPlayersMidfielder);

    //add new available positions to each player
       //add available positions for each player
       playersArray.forEach(element => {
        element.availablePositions= ["GK","Defender1","Defender2","Midfielder1","Midfielder2","Midfielder3","ST"];
      
    });
}

function displaySelectedTeam(){
    var selectedTeam =  playersArray[currentPlayerNumber].selectedPlayers;
    var teamWindow = document.getElementById("teamWindow");

    while (teamWindow.firstChild){
        teamWindow.removeChild(teamWindow.firstChild);
    }
    selectedTeam.forEach(element => {
       
        label = document.createElement( 'label');
        label.innerHTML += "<span> Position: " + element.player_positions + ", " +element.short_name + ", Rating: " + element.overall + "</span>";
  
        teamWindow.appendChild(label);
        teamWindow.appendChild(document.createElement("br"));
       });
    
}
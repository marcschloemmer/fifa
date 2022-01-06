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
let currentRound = 1;
let currentPlayerNumber = 0;
let currentPlayer;
let selectedPosition;
let displayedPlayers = [];
let selectedPlayer;
let selectedFormation;
let selectedPositionCut;
let amountOfPlayers;
let formationsSelected = 0;
var selectedFormations=[];
let firstTimeOverEleven = true;

//all available formations in fifa 20 plus corresponding positions
let formations = [{"Formation":"3-1-4-2","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","CM3","LM","RM","ST1","ST2"]},{"Formation":"3-4-1-2","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","CM3","LM","RM","ST1","ST2"]},{"Formation":"3-4-2-1","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","LM","LM","RM","RM","ST1"]},{"Formation":"3-4-3 diamond","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","LM","LM","RM","RM","ST1"]},{"Formation":"3-4-3 flat","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","LM","LM","RM","RM","ST1"]},{"Formation":"3-5-1-1","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","CM3","LM","RM","ST1","ST2"]},{"Formation":"3-5-2","availablePositions":["GK","CB1","CB2","CB3","CM1","CM2","CM3","LM","RM","ST1","ST2"]},{"Formation":"4-1-2-1-2 narrow","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","CM4","ST1","ST2"]},{"Formation":"4-1-2-1-2 wide","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"]},{"Formation":"4-1-3-2","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"]},{"Formation":"4-1-4-1","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-2-2-2","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","CM4","ST1","ST2"]},{"Formation":"4-2-3-1 narrow","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","CM4","CM5","ST1"]},{"Formation":"4-2-3-1 wide","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-2-4","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"]},{"Formation":"4-3-1-2","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","CM4","ST1","ST2"]},{"Formation":"4-3-2-1","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-3-3 attack","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-3-3 defend","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-3-3 false 9","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-3-3 flat","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-3-3 holding","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-4-1-1 attack","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"]},{"Formation":"4-4-1-1 midfield","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-4-2 flat","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"]},{"Formation":"4-4-2 holding","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","LM","RM","ST1","ST2"]},{"Formation":"4-5-1 attack","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"4-5-1 flat","availablePositions":["GK","LB","CB1","CB2","RB","CM1","CM2","CM3","LM","RM","ST1"]},{"Formation":"5-2-1-2","availablePositions":["GK","LB","CB1","CB2","CB3","RB","CM1","CM2","CM3","ST1","ST2"]},{"Formation":"5-2-3","availablePositions":["GK","LB","CB1","CB2","CB3","RB","CM1","CM2","LM","RM","ST1"]},{"Formation":"5-3-2","availablePositions":["GK","LB","CB1","CB2","CB3","RB","CM1","CM2","CM3","ST1","ST2"]},{"Formation":"5-4-1 diamond","availablePositions":["GK","LB","CB1","CB2","CB3","RB","CM1","CM2","LM","RM","ST1"]},{"Formation":"5-4-1 flat","availablePositions":["GK","LB","CB1","CB2","CB3","RB","CM1","CM2","LM","RM","ST1"]},
];

console.log(formations);
function createPlayerNameFields() {

    var playersDiv = document.getElementById("playerNames");

    var amountOfDivs = playersDiv.getElementsByTagName("input").length;

    //Get value from field
    amountOfPlayers = parseInt(document.getElementById("players").value);

    //Calculate difference of actual input fields and desired
    var difference = amountOfPlayers - amountOfDivs;

    //add fields if more fields are required
    for (let i = 0; i < difference; i++) {
        var label = document.createElement("label")
        label.innerHTML = "Player " + ((amountOfPlayers) + i);
        var inputField = document.createElement("input")
        inputField.type = "text"
        inputField.name = "player" + (amountOfPlayers + i);
        inputField.id = "player" + (amountOfPlayers + i);

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

    
    document.getElementById("startMenu").style.display = "none";

    playersArray = getAllPlayers();

    // console.log(playersArray);

    var fifaPlayers = await loadFifaPlayers();

    //split players in different arrays
    preparePlayerArrays(fifaPlayers.data)

   

    //load draft html
    loadDraftHTML();
}



function getAllPlayers() {

    var playersArray = [];
    var playersDiv = document.getElementById("playerNames").getElementsByTagName("input");
    Array.from(playersDiv).forEach(element => {
        playersArray.push({ "name": element.value });
    });

    //Shuffle array
    for (let i = playersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = playersArray[i]
        playersArray[i] = playersArray[j]
        playersArray[j] = temp
    }

    //add available positions for each player
    playersArray.forEach(element => {
    
        element.selectedPlayers = [];
    });
    return playersArray;

}




function loadFifaPlayers() {
    return new Promise(resolve => {
        var data;

        const fileSelector = document.getElementById('file-selector');

        const file = fileSelector.files[0];
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                data = results;
                resolve(data)
            }
        });
    })

}


function preparePlayerArrays(fifaPlayers) {
    //delete players below 80 rating
    fifaPlayers = fifaPlayers.filter(element => element.overall > 81);

    //get first position
    for (let i = 0; i < fifaPlayers.length; i++) {

        try {
            const element = fifaPlayers[i];
            element.player_positions = element.player_positions.split(',')[0];
        } catch (error) {
            // console.log("fehler",fifaPlayers[i-1]);
        }

    }

    //   console.log(fifaPlayers);

    //split up players in arrays based on position
    fifaPlayersGK = fifaPlayers.filter(element => element.player_positions == "GK");
    fifaPlayersLB = fifaPlayers.filter(function (element) {
        return element.player_positions == "LB" || element.player_positions == "LWB";
    });
    fifaPlayersCB = fifaPlayers.filter(element => element.player_positions == "CB");
    fifaPlayersRB = fifaPlayers.filter(function (element) {
        return element.player_positions == "RB" || element.player_positions == "RWB"
    });
    fifaPlayersCM = fifaPlayers.filter(function (element) {
        return element.player_positions == "CDM" || element.player_positions == "CM" || element.player_positions == "CAM"
    });
    fifaPlayersLM = fifaPlayers.filter(function (element) {
        return element.player_positions == "LM" || element.player_positions == "LF" || element.player_positions == "LW" || element.player_positions == "LS"
    });

    fifaPlayersRM = fifaPlayers.filter(function (element) {
        return element.player_positions == "RM" || element.player_positions == "RF" || element.player_positions == "RW" || element.player_positions == "RS"
    });
    fifaPlayersST = fifaPlayers.filter(function (element) {
        return element.player_positions == "CF" || element.player_positions == "ST"
    });


}


function loadDraftHTML() {

   

     //display formation selection
     document.getElementById("selectFormation").style.display = "block";
        displayFormations();
  
      
   


}

function displayFormations(){

    if(formationsSelected == playersArray.length){
        document.getElementById("selectPosition").style.display = "block";
        document.getElementById("selectFormation").style.display = "none";
        currentPlayerNumber = 0;
        loadPositions();
        displaySelectedTeam();
    }
    else{
      
        console.log("formations length",formations.length);
        for (let i = 0; i < 5; i++) {
            var index = formations.indexOf(formations[Math.floor(Math.random() * formations.length)]);
     
            selectedFormations.push(formations.splice(index, 1))
        }
        var draftWindow = document.getElementById("draftWindow");
        currentPlayer = playersArray[currentPlayerNumber];
        document.getElementById("playerName").innerHTML = currentPlayer.name;
        document.getElementById("playerName2").innerHTML = "Current Team: " + currentPlayer.name;
        document.getElementById("selectPosition").display = "block";
        console.log(currentPlayer,selectedFormations);
        console.log("formations length danach",formations.length)
        selectedFormations.forEach(element => {
            console.log("foreach",element);
            console.log("foreach",element[0]);  
            theInput = document.createElement("input");
            theInput.setAttribute('type', "radio");
            theInput.setAttribute('name', "formation");
            theInput.setAttribute('value', element[0].Formation);
            theInput.setAttribute("checked", true);
            label = document.createElement('label');
            label.innerHTML += "<span> " + element[0].Formation + "</span>";
            draftWindow.appendChild(theInput);
            draftWindow.appendChild(label);

           var image = document.createElement("img");
           var imageLink;
           var letters = /^[0-9a-zA-Z]+$/;

            if(element[0].Formation.slice(-3).match(letters)){
                imageLink = 'https://www.fifplay.com/img/fifa/20/formations/fifa-' + element[0].Formation.split(' ').join('-')+'.jpg';
            }
            else {
                imageLink = 'https://www.fifplay.com/img/fifa/20/formations/fut-' + element[0].Formation.split(' ').join('-')+'.jpg' ;
            }
            image.setAttribute('src',imageLink );
            image.setAttribute('width','300px');
            draftWindow.appendChild(document.createElement("br"));
            draftWindow.appendChild(image);
            draftWindow.appendChild(document.createElement("br"));
        });
    
        formationsSelected++;
    
        btn1 = document.createElement("button");
            btn1.classList.add("btn");
            btn1.classList.add("btn-success");
    
            btn1.onclick = playerSelected;
            btn1.innerHTML = "Select Formation";
    
    
    }
        
}

function assignFormation(){

    //push all formataions back 
    selectedFormations.forEach(element => {
        formations.push(element[0]);

    });

    console.log("formations wenn alles gepusht",formations.length);

    var tmpFormation;
    //get checked formation
    var els = document.getElementsByName("formation");
    for (var i = 0; i < els.length; i++) {
        if (els[i].checked) {
             //assign postitions to player
           tmpFormation = els[i].value;
    
        }
    }

    
for (let index = 0; index < formations.length; index++) {
    const element = formations[index];
    
    if(element.Formation == tmpFormation){
        playersArray[currentPlayerNumber].availablePositions = element.availablePositions;
    }
}


    //delete all checkboxes from 
    var draftWindow = document.getElementById("draftWindow");
    while (draftWindow.firstChild) {
        draftWindow.removeChild(draftWindow.firstChild);
    }

    selectedFormations = [];
   
    currentPlayerNumber++;
    displayFormations();
}

function changeCurrentPlayer() {
    //check if even or odd round
    var roundNumberEven = currentRound % 2 == 0 ? true : false;

    //check if round is over and how to count next player
    if ((currentPlayerNumber + 1) < amountOfPlayers && !roundNumberEven) {
        //console.log("playernumber plus");
        currentPlayerNumber++;
    }

    else if ((currentPlayerNumber - 1) >= 0 && roundNumberEven) {
        currentPlayerNumber--;
        // console.log("playernumber --");
    }
    else {
        currentRound++;
        //  console.log("new Round");
    }

    //Check if 11 rounds are over, if so , call mix all players together
    if (currentRound > 11 && firstTimeOverEleven) {
        prepareSubs();
        firstTimeOverEleven = false;
    }

    //check if draft is done
    if (currentRound > 18) {
        displayAllTeams();
    }
    loadPositions();
    displaySelectedTeam();
}



function loadPositions() {
    var draftWindow = document.getElementById("draftWindow");
    currentPlayer = playersArray[currentPlayerNumber];
    document.getElementById("playerName").innerHTML = currentPlayer.name;
    document.getElementById("playerName2").innerHTML = "Current Team: " + currentPlayer.name;
    document.getElementById("selectPosition").display = "block";
    

    currentPlayer.availablePositions.forEach(element => {
        theInput = document.createElement("input");
        theInput.setAttribute('type', "radio");
        theInput.setAttribute('name', "position");
        theInput.setAttribute('value', element);
        theInput.setAttribute("checked", true);
        label = document.createElement('label');
        label.innerHTML += "<span> " + element + "</span>";
        draftWindow.appendChild(theInput);
        draftWindow.appendChild(label)
        draftWindow.appendChild(document.createElement("br"));
    });

}

function displayPlayers() {
    document.getElementById("selectPosition").style.display = "none";
    //document.getElementById("selectPlayer").style.display = "block";


    //get checked checkbox
    var els = document.getElementsByName("position");
    for (var i = 0; i < els.length; i++) {
        if (els[i].checked) {
            selectedPosition = els[i].value;
        }
    }

    //delte selected position from available positions
    if (currentRound <= 11) {
    currentPlayer.availablePositions = currentPlayer.availablePositions.filter(element => element !== selectedPosition);
    }
    //get corresponding array
    if (currentRound <= 11) {
        selectedPositionCut = selectedPosition.substring(0, 2);
        // console.log(selectedPositionCut);
    }
    //after 11 positions, new arrays, therefore no cut
    else {
        selectedPositionCut = selectedPosition.replace(/[0-9]/g, '');;
    }

    //console.log(eval("fifaPlayers"+selectedPositionCut));
    //display 5 random players from corresponding list
    for (let i = 0; i < 5; i++) {
        var index = eval("fifaPlayers" + selectedPositionCut).indexOf(eval("fifaPlayers" + selectedPositionCut)[Math.floor(Math.random() * eval("fifaPlayers" + selectedPositionCut).length)]);
        //    console.log(index);
        displayedPlayers.push(eval("fifaPlayers" + selectedPositionCut).splice(index, 1))
    }

    //delete positions radio buttons
    var draftWindow = document.getElementById("draftWindow");
    while (draftWindow.firstChild) {
        draftWindow.removeChild(draftWindow.firstChild);
    }

    var playerWindow = document.getElementById("playerCard");
    //display players
    displayedPlayers.forEach(element => {
        console.log(element);

        divCard = document.createElement("div");
        divCard.classList.add("card");
        //load image from player
        image = document.createElement("img");
        image.classList.add("card-img-top");
        image.setAttribute("alt", "Image");
        //prepare elements id needed for url
        idString = element[0].sofifa_id.toString();
        if (idString.length == 5) {
            idString = 0 + idString;
        }
        idFirstPart = idString.substring(0, 3);
        idSecondPart = idString.substring(3, 6);

        image.setAttribute('src', 'https://cdn.sofifa.com/players/' + idFirstPart + '/' + idSecondPart + '/20_120.png');
    
        
      
        divCard.appendChild(image);

        divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");

        h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerHTML = element[0].short_name;

        divCardBody.appendChild(h5);

        
        p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.innerHTML = "Rating: " + element[0].overall;
        divCardBody.appendChild(p1);

        p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.innerHTML = "Weak Foot: " + element[0].weak_foot + ", Skill Moves: " + element[0].skill_moves;
        divCardBody.appendChild(p1);

        p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.innerHTML = "Pace : " + element[0].pace + ", Shooting: " + element[0].shooting;
        divCardBody.appendChild(p1);


        p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.innerHTML = "Passing: " + element[0].passing + ", Dribbling: " + element[0].dribbling;
        divCardBody.appendChild(p1);


        p1 = document.createElement("p");
        p1.classList.add("card-text");
        p1.innerHTML = "Defending: " + element[0].defending + ", Physic: " + element[0].physic;
        divCardBody.appendChild(p1);


        btn1 = document.createElement("button");
        btn1.classList.add("btn");
        btn1.classList.add("btn-success");
        btn1.setAttribute("value", element[0].sofifa_id);
        btn1.onclick = playerSelected;
        btn1.innerHTML = "Select Player";

        divCardBody.appendChild(btn1);

        divCard.appendChild(divCardBody);
        playerWindow.appendChild(divCard);

    });
}
function playerSelected() {
    document.getElementById("selectPosition").style.display = "block";
   // document.getElementById("selectPlayer").style.display = "none";

    selectedPlayer = $(this).val(); //get value of clicked button




    console.log("selctedPlayer", selectedPlayer);
    //push remaining players back into array and
    //add selected player to current Players'array of selected players

    displayedPlayers.forEach(element => {
        element[0].sofifa_id != selectedPlayer ? eval("fifaPlayers" + selectedPositionCut).push(element[0]) : playersArray[currentPlayerNumber].selectedPlayers.push(element[0]);

    });

    console.log("after pushing players back", eval("fifaPlayers" + selectedPositionCut));
    console.log("after adding player to player", playersArray[currentPlayerNumber]);

    //clear all arrays
    displayedPlayers = [];

    //delete players radio buttons
    var playerWindow = document.getElementById("playerCard");
  
    while (playerWindow.firstChild) {
        playerWindow.removeChild(playerWindow.firstChild);
    }

    //change current player
    changeCurrentPlayer()

}

function prepareSubs() {
    //mix defenders, midfields, strikers together
    fifaPlayersDefender = fifaPlayersLB.concat(fifaPlayersCB);
    fifaPlayersDefender = fifaPlayersDefender.concat(fifaPlayersRB);
    // console.log(fifaPlayersDefender);

    fifaPlayersMidfielder = fifaPlayersLM.concat(fifaPlayersCM);
    fifaPlayersMidfielder = fifaPlayersMidfielder.concat(fifaPlayersRM);
    //  console.log(fifaPlayersMidfielder);

    //add new available positions to each player
    //add available positions for each player
    playersArray.forEach(element => {
        element.availablePositions = ["GK", "Defender", , "Midfielder", "ST"];

    });
}

function displaySelectedTeam() {
    var selectedTeam = playersArray[currentPlayerNumber].selectedPlayers;
    var teamWindow = document.getElementById("teamWindow");

    while (teamWindow.firstChild) {
        teamWindow.removeChild(teamWindow.firstChild);
    }

    selectedTeamGK = selectedTeam.filter(element => element.player_positions == "GK");
    displaySpecificPlayers(selectedTeamGK,teamWindow,"Goalkeeper");

    selectedTeamLB = selectedTeam.filter(function (element) {
        return element.player_positions == "LB" || element.player_positions == "LWB";
    });
    displaySpecificPlayers(selectedTeamLB,teamWindow,"Left Back");
    
    selectedTeamCB = selectedTeam.filter(element => element.player_positions == "CB");
    displaySpecificPlayers(selectedTeamCB,teamWindow,"Centre Back");

    selectedTeamRB = selectedTeam.filter(function (element) {
        return element.player_positions == "RB" || element.player_positions == "RWB"
    });
    displaySpecificPlayers(selectedTeamRB,teamWindow,"Right Back");

    selectedTeamCM = selectedTeam.filter(function (element) {
        return element.player_positions == "CDM" || element.player_positions == "CM" || element.player_positions == "CAM"
    });
    displaySpecificPlayers(selectedTeamCM,teamWindow,"Centre Midfield");
   
    selectedTeamLM = selectedTeam.filter(function (element) {
        return element.player_positions == "LM" || element.player_positions == "LF" || element.player_positions == "LW" || element.player_positions == "LS"
    });
    displaySpecificPlayers(selectedTeamLM,teamWindow,"Left Midfield");

    selectedTeamRM = selectedTeam.filter(function (element) {
        return element.player_positions == "RM" || element.player_positions == "RF" || element.player_positions == "RW" || element.player_positions == "RS"
    });
    displaySpecificPlayers(selectedTeamRM,teamWindow,"Right Midfield");

    selectedTeamST = selectedTeam.filter(function (element) {
        return element.player_positions == "CF" || element.player_positions == "ST"
    });
    displaySpecificPlayers(selectedTeamST,teamWindow,"Striker");

 

}

function displaySpecificPlayers(array,teamWindow,position){

    if (array.length > 0) {
        headline = document.createElement('h5');
    headline.innerHTML=position;
    teamWindow.appendChild(headline);
    }
    array.forEach(element => {

       
        label = document.createElement('label');
        label.innerHTML += "<span> Position: " + element.player_positions + ", " + element.short_name + ", Rating: " + element.overall + "</span>";

        teamWindow.appendChild(label);
        teamWindow.appendChild(document.createElement("br"));
    });
}

function displayAllTeams() {
    var container = document.getElementById("container");
    container.innerHTML = "";
    var div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("row-cols-" + amountOfPlayers);
    container.appendChild(div);

    playersArray.forEach(element => {
        var playerDiv = document.createElement("div");
        playerDiv.classList.add("col");
        label = document.createElement('label');
        label.innerHTML += "Team: " + element.name;
        playerDiv.appendChild(label);
        linebreak = document.createElement("br");
        playerDiv.appendChild(linebreak)

        element.selectedPlayers.sort((a,b) => (a.overall > b.overall) ? -1 : ((b.overall > a.overall) ? 1 : 0))

        element.selectedPlayers.forEach(player => {
            label = document.createElement('label');
            label.innerHTML += 
            "<span>" + player.overall + ", " + 
            player.short_name+   "</span>";
            playerDiv.appendChild(label);
            linebreak = document.createElement("br");
            playerDiv.appendChild(linebreak)

        });
        div.appendChild(playerDiv);
        document.getElementById("selectPosition").style.display = "none";

    });
}
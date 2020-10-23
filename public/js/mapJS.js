// allstates onclick function
var alls = document.getElementById('outlines');
alls.onclick = function(ev) {
    //console.log(ev.path[0].id);
    //console.log(condimentStateDict[ev.path[0].id]);
    if(continueLocked === true){
        stateGuessed(ev.path[0].id);
    }
}

function onServerLeaderboard(leaderboardList){
    console.log(leaderboardList);
    outputText = "";
    leaderboardList.forEach(function(element){
        outputText = outputText + element['name'] + "   :   " + String(element['score']) + "   "; //\n what?
    });
    document.getElementById('stateName').innerHTML = "LeaderBOARD: \n" + outputText;
}



timeSec = 0;
function timerFunc(){
    if((1<=state) && (state<=6) && (continueLocked)){
        if(timeSec<=30){
            timeSec+=1;
            console.log('TIME' + timeSec);
            document.getElementById('timerText').innerHTML = "Time: " + String(30-timeSec) + "s";
            if(timeSec == 30){
                document.getElementById('stateName').innerHTML = "You didn't get it. -10 points. State was: " + randState;
                points-=10;
                continueLocked = false;
                updatePoints();
        }
        }
    }
}

state = 0;
continueLocked = false;
playerName = "";
function buttonPressed(){
    console.log("NAME = " + playerName);
    console.log("state = " + state);
    if(state == 8){
        state = 0;
    }
    if(state == 7){
        document.getElementById('stateName').innerHTML = "";
        document.getElementById('beginButton').innerHTML = "Restart";
        var ajax_params = {
            'url'     : "https://user.tjhsst.edu/2020kusubyan/map_leaderboard_helper",
            'type'    : "get",
            'data'    : {'name' : playerName, "score" : points},
            'success' : onServerLeaderboard
        }
        $.ajax( ajax_params)
        state+=1;
    }
    if(state == 6){
        document.getElementById('instructionText').innerHTML = 'Game Over! Your Score: ' + points + '/100.';
        document.getElementById('stateName').innerHTML = "";
        document.getElementById('beginButton').innerHTML = "See Leaderboard";
        state+=1;
        document.getElementById('timerText').innerHTML = "";
    }
    if((0<state) && (state<=5)){
        if(continueLocked == false){
            continueLocked = true;
            generateState();
            state+=1;
        }
    }
    if(state == 0){
        playerName = document.getElementById("name").value;
        document.getElementById("name").style.visibility = "hidden";
        setInterval(timerFunc, 1000);
        document.getElementById('timerText').innerHTML = "Time: " + String(30) + "s";
        points = 100;
        continueLocked = false;
        document.getElementById('instructionText').innerHTML = 'Welcome to the condiment Game! In this game you will be given a condiment (Nutella, Ketchup, etc.) and you will press on the state on the map where it is most popular. With each incorrect guess you will recieve a letter of the state but will lose points. The goal is to get through five rounds with the least amount of points lost.';
        document.getElementById('beginButton').innerHTML = 'Continue';
        document.getElementById('stateName').innerHTML = '';
        state+=1;
    }
    updatePoints();
}
randState = "";
stateLeft = "";
points = 100;
function generateState(){
    document.getElementById('timerText').innerHTML = "Time: " + String(30) + "s";
    timeSec = 0;    
    randState = statesList[Math.floor(Math.random() * statesList.length)];
    stateLeft = String(randState);
    console.log(randState);
    document.getElementById('instructionText').innerHTML = "Your state's favorite condiment: " + condimentStateDict[randState];
    document.getElementById('stateName').innerHTML = "State: _______________";
    updatePoints();
}
function stateGuessed(stateWhichGuessed){
    if(stateWhichGuessed == randState){
        document.getElementById('stateName').innerHTML = "You Guessed it! Press Continue to continue. State: " + stateWhichGuessed;
        continueLocked = false;
    }else{
        if (stateLeft.length > 1) {
            points-=1;
            document.getElementById('stateName').innerHTML = document.getElementById('stateName').innerHTML.replace('_', stateLeft[0]);
            stateLeft = stateLeft.substring(1, stateLeft.length);
        }else{
            document.getElementById('stateName').innerHTML = "You didn't get it. -10 points. State was: " + randState;
            points-=10;
            continueLocked = false;
        }
    }
    updatePoints();
}

function updatePoints(){
    document.getElementById('points').innerHTML = 'Points = ' + String(points);
}
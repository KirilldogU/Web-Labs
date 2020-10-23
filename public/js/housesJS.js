var audio = document.getElementById("sound");
document.getElementById("logoutButton").onclick = function () {
    location.href = "https://user.tjhsst.edu/2020kusubyan/reset_oauth";
};
var ajax_params = {
    'url'     : "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper",
    'type'    : "get",
    'data'    : {},
    'success' : onServerLeaderboard
}
$.ajax( ajax_params)
function onServerLeaderboard(leaderboardList){
    console.log(leaderboardList);
    outputText = "";
    leaderboardList.forEach(function(element){
        outputText = outputText + String(element['votes']) + "           /";
    });
    audio.play();
    document.getElementById('result_text').innerHTML = outputText;
}

function olafVote(){
    console.log('OLAF');
    ajax_params['url'] = "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper?vote=Olaf";
    console.log(ajax_params);
    $.ajax( ajax_params);
}

function annaVote(){
    console.log('ANNA');
    ajax_params['url'] = "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper?vote=Anna";
    console.log(ajax_params);
    $.ajax( ajax_params);
    
}

function elsaVote(){
    console.log('ELSA');
    ajax_params['url'] = "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper?vote=Elsa";
    console.log(ajax_params);
    $.ajax( ajax_params);
}

function kristoffVote(){
    console.log('KRISTOFF');
    ajax_params['url'] = "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper?vote=Kristoff";
    console.log(ajax_params);
    $.ajax( ajax_params);
}

function hansVote(){
    console.log('HANS');
    ajax_params['url'] = "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper?vote=Hans";
    console.log(ajax_params);
    $.ajax( ajax_params);
}

function svenVote(){
    console.log('SVEN');
    ajax_params['url'] = "https://user.tjhsst.edu/2020kusubyan/sql_houses_helper?vote=Sven";
    console.log(ajax_params);
    $.ajax( ajax_params);
}
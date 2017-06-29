 // Initialize Firebase
var config = {
    apiKey: "AIzaSyBu-NBYQbF2wsG2DyVEBNL-oDRHKhSD1GE",
    authDomain: "two-cars-d7151.firebaseapp.com",
    databaseURL: "https://two-cars-d7151.firebaseio.com",
    projectId: "two-cars-d7151",
    storageBucket: "two-cars-d7151.appspot.com",
    messagingSenderId: "221154158560"
};

firebase.initializeApp(config);
database = firebase.database(); 
ref = database.ref('scores')
ref.on('value', gotData, errData);
    
function gotData(data) {
    // Store Data
    var scores = data.val();
    var keys = Object.keys(scores)

    // Clear the list first
    var playersdata = selectAll('.myclass-td');
    for (var i = 0; i < playersdata.length; i++) {
        playersdata[i].remove();
    }

    // Sorting the data
    var player_data = []
    for (var i = 0; i < keys.length; i++) {
        player_data.push([scores[keys[i]].name, scores[keys[i]].point, scores[keys[i]].speed])
    }
    player_data.sort(function(a, b) {
        return b[1] - a[1];
    });

    // Displaying data
    var table = document.getElementById("user_table");
    for (var i = 0; i < keys.length; i++) {
        if(i == 7)
            break;
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.className += 'myclass-td';
        cell2.className += 'myclass-td';
        cell3.className += 'myclass-td';
        cell4.className += 'myclass-td';
        cell1.innerHTML = i+1;
        cell2.innerHTML = player_data[i][0];
        cell3.innerHTML = player_data[i][1];
        cell4.innerHTML = player_data[i][2] + " m/s";
    }
}

function errData(err) {
    console.log("Error!");
    console.log(err)
}
/*************************************
 *Author: Austin Leehealey
 *Date:12/7/2018
 *Description: The script for the functions of scoutingWebsite.html
 *Ongoing Problems:Favicon.ico
                  :The inability to accept &:,"= characters
                  :Make it process images
 ***************************************/
function addTeam() {

    var form = document.getElementById("addTeamForm");
    var formI = document.getElementById("addTeamFormImage");
    form.style.display = "inline-block";
    formI.style.display = "inline-block";

}


function appearFunction(id) {

    var pressedButton = document.getElementById(id);
    var title = pressedButton.title;
    var page = document.getElementById(title);
    var onOffSwitch = page.title;

    if (onOffSwitch == "off") {

        page.style.display = "inline-block";
        page.title = "on";
    } else {

        page.style.display = "none";
        page.title = "off";

    }

}
function receiveData() {

    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            
            var Json = this.responseText
            var dataStr = document.getElementById("dataStr");

            dataStr.innerHTML = Json;
            processData();
            
        }
    };
    xhttp.open("GET", "data.txt", true);
    xhttp.send();
}
function processData() {
    var dataStr = document.getElementById('dataStr');
    var onOffSwitch = dataStr.title;
    //{"23":{"Name":"23","teamNumber":"","data1":"","data2":"","data3":"","data4":"","data5":"","data6":"","":""}"123":{"Name":"23","teamNumber":"","data1":"","data2":"","data3":"","data4":"","data5":"","data6":"","":""}}
    if (onOffSwitch == 'on') {

        var data1 = dataStr.innerHTML;
        var data = String(data1);

        for (data; data.indexOf("+") != -1;) {

            data = data.replace('+', ' ');

        }
        for (data; data.indexOf(',') != -1;) {

            // first we have to add a new row

            var teamTable = document.getElementById("teamTable");

            var newRow = teamTable.insertRow(1);

            //so the first for loop has to first cut the first 23 off bc we dont need it here

            var Firstcolon = data.indexOf(':');

            data = data.substring(Firstcolon + 1, data.length);

            //okay Bam thats done
            //now it goes into this next loop here that is going to pull out all of the info types and infos about that 1 Json

            for (var i = 0; i < 11; i++) {

                var cell = newRow.insertCell(i);

                //data
                var colon = data.indexOf(':');
                var quotationMark = data.indexOf('"');
                var comma = data.indexOf(',');

                var infoType = data.substring(quotationMark + 1, colon - 1);
                var info = data.substring(colon + 2, comma - 1);
                var infoStr = String(info);

                cell.innerHTML = infoStr;
                data = data.substring(comma + 1, data.length);
            }

            var lastComma = data.indexOf(',');
            data = data.substring(lastComma + 1, data.length);
        }

        var newRow = teamTable.insertRow(1);
        var newRow1 = teamTable.insertRow(1);
        var newRow2 = teamTable.insertRow(1);
        var newRow3 = teamTable.insertRow(1);

        dataStr.title = 'off';
    }
    dataStr.innerHTML = '';

    }

    function receiveData2(String) {

        var str = String;
        var userInput = document.getElementById('userInput');
        userInput.innerHTML = str;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                var Json = this.responseText;

                var searchJson = document.getElementById('searchJson');
                searchJson.innerHTML = Json;

                showTeams();
            }
        };
        xhttp.open("GET", "data.txt", true);
        xhttp.send();
    }

    function changeTitle(id) {

        var checkBox = document.getElementById(id);
        var title = checkBox.title;
        var userSearch = document.getElementById('userSearch');

        if (title == 'off') {
            checkBox.title = 'on';
            checkBox.style.background = 'red';

        } else if (title == 'on') {
            checkBox.title = 'off';
            checkBox.style.background = "white";

        }

    }
    function showTeams() {

        var teamNumberCheckBox = document.getElementById('teamNumberCheckBox');
        var teamNameCheckBox = document.getElementById('teamNameCheckBox');
        var yearCheckBox = document.getElementById('yearCheckBox');

        var nameCheck = teamNameCheckBox.title;
        var numberCheck = teamNumberCheckBox.title;
        var yearCheck = yearCheckBox.title;

        var checkStr = (nameCheck + numberCheck + yearCheck);
        //so these will either be 'on' or 'off'
        var errorDiv = document.getElementById('searchError');
        //this is where the error message is displayed
        var table = document.getElementById('teamButtonsTable');

        var teamInfoPageJsonDiv = document.getElementById('teamJsonInfoPage');

        var userInput = document.getElementById('userInput');
        var str = userInput.innerHTML;
        var onOffSwitch = userInput.title;
        str = str.toLowerCase();
        //this is the user's inputed string lowercase

        var searchJson = document.getElementById('searchJson');
        var dataStr = String(searchJson.innerHTML);
        for (dataStr; dataStr.indexOf("+") != -1;) {

            dataStr = dataStr.replace('+', ' ');

        }

        var capDataStr = dataStr;
        //this is the data string put with capital letters
        dataStr = dataStr.toLowerCase();
        //this is the data string with lowercase letters
        var capJson = JSON.parse(capDataStr);
        //this is the Json with upper case letters
        var Json = JSON.parse(dataStr);
        //this is the Json with lower case letters 
        if (onOffSwitch == 'on') {
            if (str != '') {
                if (nameCheck == 'on' && numberCheck == 'off' && yearCheck == 'off') {

                    for (var key in Json) {
                        if (key.indexOf(str) != -1) {
                                var dataStr2 = Json[key]["teamnumber"];

                                for (var key2 in capJson) {

                                    var d3 = capJson[key2]["teamNumber"];

                                    if (dataStr2 == d3) {

                                        var newRow = table.insertRow(0);
                                        var i = 0;
                                        for (var d2 in capJson[key2]) {

                                            var newCell = newRow.insertCell(i);
                                            if (i == 0) {
                                                var button = "<button onclick='teamInfoPage()' class='teamInfoButton'>" + capJson[key2][d2] + "</button>";
                                                newCell.innerHTML = button;
                                                i++;
                                                teamInfoPageJsonDiv.innerHTML = capJson[key2];
                                            } else {
                                                newCell.innerHTML = capJson[key2][d2];
                                                i++;
                                            }
                                        }
                                    }

                                
                            }

                        }

                    }
                } else if (nameCheck == 'off' && numberCheck == 'off' && yearCheck == 'on'){

                    for (var key in capJson) {


                        var yd1 = String(capJson[key]["year"]);

                        if (yd1.indexOf(str) != -1) {
                            var newRow = table.insertRow(0);
                            var i = 0;
                            for (var yeard in capJson[key]) {
                                var newCell = newRow.insertCell(i);
                                if (i == 0) {
                                    var button = "<button onclick='teamInfoPage()' class='teamInfoButton'>" + capJson[key][yeard] + "</button>";
                                    newCell.innerHTML = button;
                                    i++;
                                    teamInfoPageJsonDiv.innerHTML = capJson[key];
                                } else {
                                    newCell.innerHTML = capJson[key][yeard];
                                    i++;
                                }
                                
                            }
                        }

                    }


                
                } else if (nameCheck == 'off' && numberCheck == 'on' && yearCheck == 'off') {
                    if (str.indexOf('a') == -1 && str.indexOf('b') == -1 && str.indexOf('c') == -1 && str.indexOf('d') == -1 && str.indexOf('e') == -1 && str.indexOf('f') == -1 && str.indexOf('g') == -1 && str.indexOf('h') == -1 && str.indexOf('i') == -1 && str.indexOf('j') == -1 && str.indexOf('k') == -1 && str.indexOf('l') == -1 && str.indexOf('m') == -1 && str.indexOf('n') == -1 && str.indexOf('o') == -1 && str.indexOf('p') == -1 && str.indexOf('q') == -1 && str.indexOf('r') == -1 && str.indexOf('s') == -1 && str.indexOf('t') == -1 && str.indexOf('u') == -1 && str.indexOf('v') == -1 && str.indexOf('w') == -1 && str.indexOf('x') == -1 && str.indexOf('y') == -1 && str.indexOf('z') == -1) {
                        for (var key in capJson) {
                            var dataStr1 = capJson[key]["teamNumber"];
                            if (dataStr1.indexOf(str) != -1) {
                                    var newRow = table.insertRow(0);
                                    var i = 0;
                                    for (var datas2 in capJson[key]) {
                                        var newCell = newRow.insertCell(i)
                                        if (i == 0) {
                                            var button = "<button onclick='teamInfoPage()' class='teamInfoButton'>" + capJson[key][datas2] + "</button>";
                                            teamInfoPageJsonDiv.innerHTML = capJson[key];

                                            newCell.innerHTML = button;
                                            i++;
                                        } else {
                                            newCell.innerHTML = capJson[key][datas2];
                                            i++;
                                        }
                                    }
                                }
                            
                        }
                    }
                } else if (checkStr.indexOf('on') != -1) {
                    var on1 = checkStr.indexOf('on');
                    checkStr = checkStr.substring(on1 + 2, checkStr.length);
                    if (checkStr.indexOf('on') != -1) {
                        errorDiv.innerHTML = 'Please only select one check box';
                    }
                } else if (checkStr.indexOf('on') == -1) {
                    errorDiv.innerHTML = 'Please select a check box first';
                }
            }
            userInput.title = 'off'
        } else {
            table.innerHTML = '';
            if (str != '') {
                if (nameCheck == 'on' && numberCheck == 'off' && yearCheck == 'off') {

                    for (var key in Json) {
                        if (key.indexOf(str) != -1) {
                            var dataStr2 = Json[key]["teamnumber"];

                            for (var key2 in capJson) {

                                var d3 = capJson[key2]["teamNumber"];

                                if (dataStr2 == d3) {

                                    var newRow = table.insertRow(0);
                                    var i = 0;
                                    for (var d2 in capJson[key2]) {

                                        var newCell = newRow.insertCell(i);
                                        if (i == 0) {
                                            var button = "<button onclick='teamInfoPage()' class='teamInfoButton'>" + capJson[key2][d2] + "</button>";
                                            newCell.innerHTML = button;
                                            teamInfoPageJsonDiv.innerHTML = capJson[key2];

                                            i++;
                                        } else {
                                            newCell.innerHTML = capJson[key2][d2];
                                            i++;
                                        }
                                    }
                                }


                            }

                        }

                    }
                } else if (nameCheck == 'off' && numberCheck == 'on' && yearCheck == 'off') {
                    if (str.indexOf('a') == -1 && str.indexOf('b') == -1 && str.indexOf('c') == -1 && str.indexOf('d') == -1 && str.indexOf('e') == -1 && str.indexOf('f') == -1 && str.indexOf('g') == -1 && str.indexOf('h') == -1 && str.indexOf('i') == -1 && str.indexOf('j') == -1 && str.indexOf('k') == -1 && str.indexOf('l') == -1 && str.indexOf('m') == -1 && str.indexOf('n') == -1 && str.indexOf('o') == -1 && str.indexOf('p') == -1 && str.indexOf('q') == -1 && str.indexOf('r') == -1 && str.indexOf('s') == -1 && str.indexOf('t') == -1 && str.indexOf('u') == -1 && str.indexOf('v') == -1 && str.indexOf('w') == -1 && str.indexOf('x') == -1 && str.indexOf('y') == -1 && str.indexOf('z') == -1) {
                        for (var key in capJson) {
                            var dataStr = capJson[key]["teamNumber"]
                            if (dataStr.indexOf(str) != -1) {
                                var newRow = table.insertRow(0);
                                var i = 0;
                                for (var datas2 in capJson[key]) {
                                    var newCell = newRow.insertCell(i)
                                    if (i == 0) {
                                        var button = "<button onclick='teamInfoPage()' class='teamInfoButton'>" + capJson[key][datas2] + "</button>";
                                        teamInfoPageJsonDiv.innerHTML = capJson[key];

                                        newCell.innerHTML = button;
                                        i++;
                                    } else {
                                        newCell.innerHTML = capJson[key][datas2];
                                        i++;
                                    }
                                }
                            }

                        }
                    }
                } else if (nameCheck == 'off' && numberCheck == 'off' && yearCheck == 'on') {

                    for (var key in capJson) {


                        var yd1 = String(capJson[key]["year"]);

                        if (yd1.indexOf(str) != -1) {
                            var newRow = table.insertRow(0);
                            var i = 0;
                            for (var yeard in capJson[key]) {
                                var newCell = newRow.insertCell(i);
                                if (i == 0) {
                                    teamInfoPageJsonDiv.innerHTML = capJson[key];

                                    var button = "<button onclick='teamInfoPage()' class='teamInfoButton'>" + capJson[key][yeard] + "</button>";
                                    newCell.innerHTML = button;
                                    i++;
                                } else {
                                    newCell.innerHTML = capJson[key][yeard];
                                    i++;
                                }

                            }
                        }

                    }



                } else if (checkStr.indexOf('on') != -1) {
                    var on1 = checkStr.indexOf('on');
                    checkStr = checkStr.substring(on1 + 2, checkStr.length);
                    if (checkStr.indexOf('on') != -1) {
                        errorDiv.innerHTML = 'Please only select one check box';
                    }
                } else if (checkStr.indexOf('on') == -1) {
                    errorDiv.innerHTML = 'Please select a check box first';
                }
            }
        }
    }
function teamInfoPage(Json) {
    var JsonDiv = document.getElementById('teamJsonInfoPage');
    var Json = JsonDiv.innerHTML;
    var searchPage = document.getElementById('searchPage');
    //var comparePage = document.getElementById('comparePage');
    var teamsPage = document.getElementById('teamsPage');

    searchPage.style.display = 'none';
   // comparePage.style.display = 'none';
    teamsPage.style.display = 'none';




}
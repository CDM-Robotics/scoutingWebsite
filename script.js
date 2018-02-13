/*************************************
 *Author: Austin Leehealey
 *Date:12/7/2018
 *Description: The script for the functions of scoutingWebsite.html
 *Ongoing Problems:Favicon.ico
                  :The inability to accept &:,"= characters
 ***************************************/


/***********************************************************************
                              pageAppear()
//This function is used to make all the pages appear on command

// it takes the id of the button pressed and takes the name of the button.
 the name of the button must be the id of the page that you want to appear,
then it finds the page by that id and then also find the name of the page
which is either on or off,
this is the on off switch, which the function uses in order to determine whether
to turn on the page or turn it off if it was already on
***********************************************************************/
function pageAppear(id) {

    var button = document.getElementById(id);
    //this is the button that was pressed
    var pageName = button.name;
    var page = document.getElementById(pageName);
    var display = page.attributes.name.nodeValue;
    //this gets subpage Div that it wants to turn on or off

    if (display == "off"){
        page.style.display = "inline-block";
        page.attributes.name.nodeValue = 'on';
    } else if (display == "on") {
        page.style.display = "none";
        page.attributes.name.nodeValue = 'off';
    }

}

//this function is called before the pageAppear function to erase all of the previous displays on the page to make way for the next one
function erasePage() {

    var presentDivs = document.getElementsByClassName('subPage');

    var i = presentDivs.length;

    var j = 0
    for (j; j < i;) {

        presentDivs[j].style.display = 'none';
        j++;

    }

}

function receiveData(id) {

    var xhttp = new XMLHttpRequest();
    var button = document.getElementById(id);
    var name = button.name;

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var Json = this.responseText;

            if (id == 'yearSearchTable') {
                processData(Json, id);
            } else if (name == 'spreadSheet') {
                receiveYears(id, Json);
            }
            
            

        }
    }
    xhttp.open("GET", "data.txt", true);
    xhttp.send();

}
function receiveYears(id, Json) {

    var xhttp = new XMLHttpRequest();
    var button = document.getElementById(id);
    var name = button.name;

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var yearsJson = this.responseText;

            if (id == 'yearSearchTable') {
                processData(yearsJson, id);
                return 0;
            } else if (name == 'spreadSheet') {
                displayData(Json, id, 'year', yearsJson);

            }



        }
    }
    xhttp.open("GET", "years.txt", true);
    xhttp.send();

}
/******************************************************************
 *                          displayData()
This function here is the function that i want to use for the entire
spreadsheet operation

I want this function to take the table in the main box and display all the data
in table format but still be able to apply the filters sent in by the user

 * 
 ******************************************************************/
function displayData(data, id, name, yearsJsonStr) {

    //data = the teamsjson
    //the id is the year
    //name is the string year
    var teamJson = JSON.parse(data);
    var table = document.getElementById('spreadSheetTable');
    var j = 0;
    var yearsJson = JSON.parse(yearsJsonStr);
    //this is the Json with the years on it
    table.innerHTML = '';

    /*okay so first i need to display the yearsJson data values to the first row of the table
        i'll do that by going through the yearsJson to see if the year matches the id

        ill run a for loop on the keys in yearsJson
            then inside that loop i'll run an iff then statement asking if the key has the index of the id or year
                then i'll create a new row in position 0 of the table
                then i'll create another for loop going through the keys of the yearsJson
                    everytime i'll create a cell
                    and add the yearsJson stuff to the inner html of the cell
                    
         then i'll break out of the loop
    */


    var newRow = table.insertRow(0);
    var i = 0;
    for (var innerKey in yearsJson[id]) {
        var newCell = newRow.insertCell(i);
        newCell.innerHTML = yearsJson[id][innerKey];
        i++;
    }
            
    for (var key in teamJson) {

        //if the teamJson in question's year number is the same year as id's year
        if (teamJson[key][name].indexOf(id) != -1) {


            var Row1 = table.insertRow(1);
            var i = 0;
            for (var innerKey in teamJson[key]) {
                var newCell = Row1.insertCell(i);
                newCell.innerHTML = teamJson[key][innerKey];
                i++;
            }


        }
    }
}


function displayCompetitions() {
    var table = document.getElementById('spreadSheetTable');

}
/*****************************************************************
 *                        processData()

This function is oing to take the Json data of all the teams, parse it,
and then go through finding all of the years the Json has that are valid
Then it is going to take the table and add buttons to it displaying that year
which then will display those teams on click
 * 
 *****************************************************************/
function processData(data, id) {

    var yearsJson = JSON.parse(data);
    //this is the json with all the  teams
    var table = document.getElementById(id);
    //id is the table displaying the buttons 

    var executedYears = '.';
    for (var key in yearsJson) {

        if (executedYears.indexOf(key) == -1) {

            var newRow = table.insertRow(0);
            newRow.innerHTML = "<button class='yearButtons' id='" + key + "' name='spreadSheet' style=' font-size:20px; color: white; width:100%; height:5%; background-color:darkblue; border: 0px;' onclick='erasePage();pageAppear(id);displayCompetitions(id);'>FRC Game " + key + "</button>";
            executedYears = executedYears + key + ".";

        }   
    }
 
    }



//These functions down here are from my old program and should only be used for reference


function searchYears(String) {

    var JsonStr = String;

    var Json = JSON.parse(JsonStr);

    var searchBar = document.getElementById('searchYears');
    var userSearch = searchBar.value;

    var Menu = document.getElementById("yearSearchTable");

    Menu.innerHTML = '';

    var yearLog = {};

    for (var key in Json) {

        var yearLogStr = JSON.stringify(yearLog);

        if (Json[key]['year'].indexOf(userSearch) != -1 && yearLogStr.indexOf(Json[key]['year']) == -1) {

            var newRow = Menu.insertRow(0);
            var newCell = newRow.insertCell(0);

            newCell.innerHTML = "<button id='" + Json[key]['year'] + "'name='spreadSheet'style='margin:0px; border:1px solid black; width:100%; background-color: transparent;'onclick='erasePage(); pageAppear(id); receiveData(id);'>" + Json[key]['year'] + "</button>";

            yearLog[Json[key]['year']] = Json[key]['year'];
        }


    }

    if (userSearch == '') {
        Menu.innerHTML = '';
    }

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
/*
    var year2018 = {'teamName': 'Team Name', 'teamNumber': 'Team Number', 'year': '2018', 'data1': 'Scouter', 'data2': 'Team Cooperation', 'data7':'Switch cubes','data8':'Scale cubes','data9':'Exchanged cubes','data12':'Overall Grade','data13':'Comments'};

    var table = document.getElementById("spreadSheetTable");

    var Json = JSON.parse(data);
    if (buttonId == '2018') {

        var firstRow = table.insertRow(0);
        var i = 0;
        var secondRow = table.insertRow(1);
        for (key in year2018) {

            var firstCells = firstRow.insertCell(i);

            firstCells.innerHTML = year2018[key];

            i++;
        }
        for (key in Json) {

            if (Json[key]['year'].indexOf(buttonId) != -1) {

                var newRow = table.insertRow(2);

                var i = 0;

                for (data in Json[key]) {

                    if (i == 15) {
                        break;
                    }
                    var newCell = newRow.insertCell(i);

                    newCell.innerHTML = Json[key][data];

                    i++;
                    

                }
                
            }

        }
    

    }*/

    /*
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
    */
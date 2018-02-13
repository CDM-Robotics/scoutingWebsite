/*************************************
 *Author: Austin Leehealey
 *Date:12/7/2018
 *Description: The script for the functions of scoutingWebsite.html
 *Ongoing Problems:Unable to save the data when you restart the server

 ***************************************/

var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');

var teamsJson = {};
var yearsJson = {};
var competitionJson = {};

//Long Term Issues
//  Favicon.ico

var server = http.createServer(function (request, response) {

    fs.readFile('./' + request.url, function (err, data) {

        var urlStr = String(request.url);
        console.log('Url is ' + url);
        console.log('Error = ' + err);
        console.log('Url String = ' + urlStr);
        if (err == null) {

            if (urlStr == '/style.css') {
                console.log('Sending ./style.css');
                response.setHeader('Content-type', 'text/css');
                response.end(data);
            }
            else if (urlStr == '/data.txt') {

                fs.readFile('./data.txt', function (err, data) {

                    response.setHeader('Content-type', 'text/plain');
                    response.end(data);
                    console.log('DATA SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEENT!!!!');

                });
            }
            else if (urlStr == '/script.js') {
                fs.readFile('./script.js', function (err, data) {

                    response.setHeader('Content-type', 'type/Javascript');
                    response.end(data);
                    console.log('Sending ./script.js');
                });
            }
            else if (urlStr == '/years.txt') {
                fs.readFile('./years.txt', function (err, data) {
                    response.setHeader('Content-type', 'text/plain');
                    response.end(data);
                    console.log('DATA SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEENT!!!!');
                });
            }


        } else if (urlStr == '/') {
            fs.readFile('./scoutingWebsite.html', function (err, data) {
                console.log('Sending ./scoutingWebsite.html');
                response.setHeader('Content-type', 'text/html');
                response.end(data);
            });

        }
        else if (urlStr.indexOf('/submit') != -1) {

            if (request.method == 'POST') {

                var imageName;

                var Name;

                var form = new formidable.IncomingForm();
                //This function extracts the photo that is sent
                form.parse(request, function (err, fields, files) {

                    var oldpath = files.teamImage.path;
                    console.log("the oldpath is " + oldpath);

                    var newpath = '/Program Files/nodejs/pictures/' + files.teamImage.name;
                    console.log("the newpath is " + newpath);

                    imageName = files.teamImage.name;

                    fs.rename(oldpath, newpath, function (err) {
                        if (err != null) {

                            console.log(err);

                        } else {

                            teamsJson[Name]['teamImage'] = imageName;
                            console.log(teamsJson);
                            End();
                        }
                    });

                });
                //This function extracts all the data as it comes and stuffs it into a Json
                form.on('field', function (field, value) {

                    console.log('Data ' + field + ' = ' + value);


                    if (field == "teamName") {

                        Name = String(value);

                        console.log("Name = " + Name);
                        console.log("Field = " + field + " and value = " + value);

                        teamsJson[Name] = {};
                        teamsJson[Name][field] = value;
                        console.log(teamsJson);

                    } else {

                        console.log("Field = " + field + " and value = " + value);

                        teamsJson[Name][field] = value;
                        console.log(teamsJson);

                    }
                    console.log('Next input');

                });
                //This function sends you back to the home page and saves the data
                function End() {
                    fs.writeFile('data.txt', JSON.stringify(teamsJson), function (data, err) {

                        /*var existingData = JSON.parse(data);

                        existingData[Name + teamsJson[Name][year]] = {};
                        existingData[Name + teamsJson[Name][year]][]

                    });
                    fs.writeFile('data.txt', JSON.stringify(teamsJson), function (err) {
*/
                        console.log("Data Saved");

                    });



                    fs.readFile('./scoutingWebsite.html', function (err, data) {
                        console.log('Sending ./scoutingWebsite.html');
                        response.setHeader('Content-type', 'text/html');
                        response.end(data);
                    });
                }

            }

        }
        else if (urlStr.indexOf('/newYear') != -1) {

            var name;
            var j = 0;
            if (request.method == 'POST') {


                var form = new formidable.IncomingForm();
                //This function extracts the photo that is sent
                form.parse(request, function (err, fields) {

                });
                form.on('field', function (field, value) {

                    if (field == 'year') {
                        name = value;
                        yearsJson[name] = {};
                        yearsJson[name]['teamName'] = "Team Name";
                        yearsJson[name]['teamNumber'] = "Team Number";
                        yearsJson[name][field] = value;
                        yearsJson[name]['scouter'] = "Scouter Name";
                        yearsJson[name]['teamCooperation'] = "Team Cooperation";

                        console.log('logged the first huge chunk');

                    } else {
                        yearsJson[name][field] = value;
                    }
                    if (j == 7) {
                        console.log(name);
                        yearsJson[name]['opinion'] = "Scouter's Opinion";
                        yearsJson[name]['compatability'] = "Compatability";
                        yearsJson[name]['robotGrade'] = "Robot Overall Grade";
                        yearsJson[name]['comments'] = "Comments";
                        yearsJson[name]['image'] = "Image";
                        console.log(JSON.stringify(yearsJson));

                        end2years();
                    }
                    j++
                });


            }
            function end2years() {
                var yearsJsonStr = JSON.stringify(yearsJson);
                fs.writeFile('years.txt', yearsJsonStr, function (err) {

                    console.log('saved years');

                });
                fs.readFile("./scoutingWebsite.html", function (err, data) {

                    console.log('Sending scoutingWebsite.html');
                    response.setHeader('Content-type', 'text/html');
                    response.end(data);

                });
            }

        }
        else if (urlStr.indexOf('/newCompetition') != -1) {
            var name;
            if (request.method == "POST") {
                
                var form = new formidable.IncomingForm();
                //This function extracts the photo that is sent
                form.parse(request, function (err, fields) {

                });
                form.on('field', function (field, value) {
                    //field
                    //value 
                    if (field == 'competitionName') {
                        name = value;
                        competitionJson[name] = {};
                        competitionJson[name][field] = value;
                    } else {
                        competitionJson[name][field] = value;
                    }
                    if (field == 'year') {
                        End();
                    }
                });
                
                function End() {
                    fs.writeFile('competition.txt', JSON.stringify(competitionJson), function (err) {

                        console.log('done');
                    });
                    fs.readFile('./scoutingWebsite.html', function (err, data) {
                        console.log('Sending scoutingWebsite.html');
                        response.setHeader('Content-type', 'text/html');
                        response.end(data);
                    });
                }
            }
        }
    });

});
server.listen(8080);
util.log('Server listenning at localhost:8080');


                /* the Old Post Processing Code
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    var oldpath = files.teamImage.path;
                    console.log("the oldpath is " + oldpath);
                    var newpath = '/Program Files/nodejs/pictures/' + files.teamImage.name;
                    console.log("the newpath is " + newpath);
                    fs.rename(oldpath, newpath, function (err) {
                        if (err != null) {
                            console.log(err);
                        }
                        res.write('File uploaded and moved!');
                        res.end();
                    });
                });
                
                //console.log("Data");
                
                request.on('data', function (data) {
                    
                    var dataStr = String(data);
                    //teamName=ogh&teamNumber=2124&data1=osidgh&data2=ogqh&data3=obih&data4=owrhi&data5=on&data6=pbrin
                    console.log("Data = " + dataStr);

                    var nameEqualSign = dataStr.indexOf('=');
                    console.log(nameEqualSign);

                    var nameAndSign = dataStr.indexOf('&');
                    console.log(nameAndSign);

                    var teamName = dataStr.substring(nameEqualSign + 1, nameAndSign);
                    console.log(teamName);
                    teamsJson[teamName] = {};

                    for (var equalSign = dataStr.indexOf('='); equalSign != -1;) {

                        equalSign = dataStr.indexOf('=');
                        console.log(equalSign);

                        var andSign = dataStr.indexOf('&');
                        console.log(andSign);

                        if (andSign == -1) {

                            var infotype = dataStr.substring(0, equalSign);
                            var teamInfo = dataStr.substring(equalSign + 1, dataStr.length);
                            console.log(teamInfo);

                            teamsJson[teamName][infotype] = teamInfo;

                            dataStr = '';
                            console.log('Url substring is now ' + dataStr);


                        } else {

                            var infotype = dataStr.substring(0, equalSign);
                            var teamInfo = dataStr.substring(equalSign + 1, andSign);
                            console.log(teamInfo);

                            teamsJson[teamName][infotype] = teamInfo;

                            dataStr = dataStr.substring(andSign + 1, dataStr.length);
                            console.log('Url substring is now ' + dataStr);


                        }

                    }
                    console.log(teamsJson[teamName]);

                    fs.writeFile('data.txt', JSON.stringify(teamsJson), function (err) {
                        if (err == null) {
                            console.log('Updated!');
                            fs.readFile('./scoutingWebsite.html', function (err, data) {

                                response.setHeader('Content-type', 'text/html');
                                response.end(data);
                                console.log('Sending ./scoutingWebsite.html');

                            });

                        } else {
                            console.log('Shoot... No good');

                        }

                    });

                
                });
*/
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
            } else if (urlStr == '/data.txt') {

                fs.readFile('./data.txt', function (err, data) {

                    response.setHeader('Content-type', 'text/plain');
                    response.end(data);
                    console.log('DATA SEEEEEEEEEEEEEEEEEEEEEEEEEEEEEENT!!!!');

                });
            } else if (urlStr == '/script.js') {
                fs.readFile('./script.js', function (err, data) {

                    response.setHeader('Content-type', 'type/Javascript');
                    response.end(data);
                    console.log('Sending ./script.js');
                });
            } 


        } else if (urlStr == '/') {
            fs.readFile('./scoutingWebsite.html', function (err, data) {
                console.log('Sending ./scoutingWebsite.html');
                response.setHeader('Content-type', 'text/html');
                response.end(data);
            });

        } else if (urlStr.indexOf('/submit') != -1) {

           /* var form = new formidable.IncomingForm();

            form.parse(req, function (err, fields, files) {
                //Store the data from the fields in your data store.
                //The data store could be a file or database or any other store based
                //on your application.

               res.writeHead(200, {
                    'content-type': 'text/plain'
                });
                res.write('received the data:\n\n');
                res.end(util.inspect({
                    fields: fields,
                    files: files
                }));
           }); 
            */
            if (request.method == 'POST') {
                console.log("POST");

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
                

            }

            


        } else if (urlStr == "/submiimage") {
            console.log("We're in");
                console.log("Made it Here");
                var form = new formidable.IncomingForm();
                form.parse(request, function (err, fields, files) {
                    console.log("Still good");
                    var oldpath = files.filetoUpload.path;
                    var newpath = './' + files.filetoUpload.name;
                    fs.rename(oldpath, newpath, function (err) {
                        console.log("Almost There");
                        if (err != -1) {
                            console.log("YAY!");
                        } else {
                            console.log("Oh Noooo...");
                        }
                    });
                });
            
        }

    });

});
server.listen(8080);
util.log('Server listenning at localhost:8080');
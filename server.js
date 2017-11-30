* http://usejsdoc.org/
 */
//var babel = require('babel-register');
var fs = require('fs');
var express = require("express");
var app     = express();
var path    = require("path");
app.use(express.static(__dirname + '/public/images'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public/javascripts'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/public/stylesheets'));

app.use(express.static(__dirname + '/views'));




app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/views/Campus_Main.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});


var request = require('request');

request.post(
    'http://sc-1.cs.mun.ca/Student_Page.html',
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);

var qs = require('querystring');


var http = require('http');



console.log(http);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/", function (req, res) {
	var object = req.body.user.name;
	var name = JSON.stringify(object);
	console.log(name);
	console.log(object);
	fs.writeFile('CONTENT.json', object, 'utf8');
	
	
	
	
});

app.listen(3331);

console.log("Running at Port 3331");





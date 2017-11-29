/**
 * http://usejsdoc.org/
 */
var babel = require('babel-register');
var fs = require('fs');
//var reach = require('./public/javascripts/SCourses2.js');
//var data = fs.readFileSync("student-2.json");
//var words = JSON.parse(data);
//console.log(words);
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
/*function data(request, response) {
    if (request.method == 'POST') {
        var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post.courseNum);
        });
    }
}*/

var http = require('http');

http.createServer((request, response) => {
  var { headers, method, url } = request;
  var body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}).listen(3331);

console.log(http);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/getdata", function (req, res) {
    console.log(req.body.user.name);
});

app.listen(3331);

console.log("Running at Port 3331");




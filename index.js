// var http = require("http");
// app.set('view engine', 'html');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
var http = require("http");
var express = require('express');
var app = express();
var $ = require('jQuery');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));

app.listen(3000, function () {
})

app.get('/', function (req, res) {
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

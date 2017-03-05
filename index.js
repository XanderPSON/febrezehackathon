var http = require("http");
var express = require('express');
var app = express();
var $ = require('jQuery');

app.listen(3000, function () {
  console.log("Listening to app on localhost 3000");
})
var http = require("http");
var express = require('express');
var app = express();
var $ = require('jQuery');

var febrezeAttr = {
  body: [{"DeviceAction": "led_behavior=28" }],
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer c.7rvd9nnU6bK1kxsZqheeMibmH2XiDKxp2kSs75oZQlYbJ56pWWuh2c1NVj98w8jEUc8b1t4sDUB34qROwArIaM3xhUaVzUMLuX2KULTZsgUM1q4tJ5grFgF1XyDdW60hbt1rjhOBN3A1J21K",
  }
};

var febrezeEnv = {
  scheme: "https",
  port: 443,
  domain: "na-hackathon-api.arrayent.io",
  oauthBasePath: "oauth2",
  apiBasePath: "v3",
  ClientID: "c29cca10-0131-11e7-9207-b5c3b663f6a4",
  SecretID: "c45e5ae3fabd0d2fc8c6a29bbfa2732c2ecf8606",
  oauthToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJjMjljY2ExMC0wMTMxLT,ExZTctOTIwNy1iNWMzYjY2M2Y2YTQiLCJlbnZpcm9ubWVudF9pZCI6Ijk0OGUyY2YwLWZkNTItMTFlNi1hZTQ2LTVmYzI0MDQyYTg1MyIsInVzZXJfaWQiOiI5MDAwMDg1Iiwic2NvcGVzIjoie30iLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwiaWF0IjoxNDg4NjcwOTA0LCJleHAiOjE0ODk4ODA1MDR9.k4OUi-vWga96-TqxpwGiJ-Ml0_faVofaumkI94m0tIyB2IYshNnElZD7pL0DFdW1M-x00HwKSBVJRo7S8JpbJQ",
  deviceId: "50331658"
}

function blinkThreeTimes() {
  $.ajax({
    method: 'PUT',
    crossDomain: true,
    headers: febrezeAttr.headers,
    url: febrezeEnv.scheme + "://" + febrezeEnv.domain + ":" + febrezeEnv.port + "/" + febrezeEnv.oauthBasePath + "/" + febrezeEnv.apiBasePath + "/devices/" + febrezeEnv.deviceId,
    data: [{"DeviceAction": "led_behavior=28" }]
  })
  .done(function() {
    console.log( "success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
}

function checkDeviceStatus() {
  $.ajax({
    method: 'GET',
    crossDomain: true,
    url: febrezeEnv.scheme + "://" + febrezeEnv.domain + ":" + febrezeEnv.port + "/" + febrezeEnv.oauthBasePath + "/" + febrezeEnv.apiBasePath + "/devices/" + febrezeEnv.deviceId,
  })
  .done(function() {
    console.log( "success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
}
app.listen(3000, function () {
  console.log("Listening to app on localhost 3000");
})
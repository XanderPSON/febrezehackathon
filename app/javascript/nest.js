/**
 *  Copyright 2014 Nest Labs Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/* globals $, Firebase, Notification */
'use strict';

var febreze = {};

febreze.attr = {
  body: [{"DeviceAction": "led_behavior=28" }],
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer c.7rvd9nnU6bK1kxsZqheeMibmH2XiDKxp2kSs75oZQlYbJ56pWWuh2c1NVj98w8jEUc8b1t4sDUB34qROwArIaM3xhUaVzUMLuX2KULTZsgUM1q4tJ5grFgF1XyDdW60hbt1rjhOBN3A1J21K",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
  }
};

febreze.env = {
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

febreze.blinkThreeTimes = function() {
  $.ajax({
    method: 'PUT',
    crossDomain: true,
    headers: febreze.attr.headers,
    url: febreze.env.scheme + "://" + febreze.env.domain + ":" + febreze.env.port + "/" + febreze.env.oauthBasePath + "/" + febreze.env.apiBasePath + "/devices/" + febreze.env.deviceId,
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

febreze.checkDeviceStatus = function() {
  $.ajax({
    method: 'GET',
    crossDomain: true,
    headers: febreze.attr.headers,
    url: febreze.env.scheme + "://" + febreze.env.domain + ":" + febreze.env.port + "/" + febreze.env.oauthBasePath + "/" + febreze.env.apiBasePath + "/devices/" + febreze.env.deviceId,
  })
  .done(function(data, textStatus, jqXHR) {
    console.log( "success" );
    console.log( data );
    console.log( textStatus );
    console.log( jqXHR );
  })
  .fail(function(data, textStatus, err) {
    console.log( "error" );
    console.log( data );
    console.log( textStatus );
    console.log( err );
  })
  .always(function(data, textStatus, jqXHR) {
    console.log( "complete" );
    console.log( data );
    console.log( textStatus );
    console.log( jqXHR );
  });
}

var nestToken     = $.cookie('nest_token'),
    smokeCOAlarms = [];

if (nestToken) { // Simple check for token

  // Create a reference to the API using the provided token
  var dataRef = new Firebase('wss://developer-api.nest.com');
  dataRef.auth(nestToken);

  // in a production client we would want to
  // handle auth errors here.

  // Request on launch since an event may not happen for a while
  Notification.requestPermission();
} else {
  // No auth token, go get one
  window.location.replace('/auth/nest');
}


/**
  Send out a notification and also log
  to the UI.

*/
function notify(title, options) {
  Notification.requestPermission(function() {
    var notification = new Notification(title, options);
  });
}


/**
  Listen for SMOKE alarm and alert the user
  as appropriate

*/
function listenForSmokeAlarms(alarm) {
  var alarmState;

  alarm.child('smoke_alarm_state').ref().on('value', function (state) {
    switch (state.val()) {
    case 'warning':
      if (alarmState !== 'warning') { // only alert the first change
        activate_spray(alarm);
      }
      break;
    case 'emergency':
      if (alarmState !== 'emergency') { // only alert the first change
        notify('Emergency', {
          tag: alarm.child('device_id').val() + 'smoke_alarm_state',
          body: 'Smoke has been detected by ' + alarm.child('name_long').val(),
          color: alarm.child('ui_color_state').val()
        });
      }
      break;
    }

    alarmState = state.val();
  });
}

function activate_spray(alarm) {
  febreze.checkDeviceStatus();

  console.log(alarm.child('ui_color_state').val(), alarm.child('smoke_alarm_state').val())
}

/**
  Listen for CO alarms and alert the user
  as appropriate

*/
function listenForCOAlarms(alarm) {
  var alarmState;

  alarm.child('co_alarm_state').ref().on('value', function (state) {
    switch (state.val()) {
    case 'warning':
      if (alarmState !== 'warning') { // only alert the first change
        notify('Heads Up', {
          tag: alarm.child('device_id').val() + '-co_alarm_state',
          body: 'CO has been detected by ' + alarm.child('name_long').val(),
          color: alarm.child('ui_color_state').val()
        });
      }
      break;
    case 'emergency':
      if (alarmState !== 'emergency') { // only alert the first change
        notify('Emergency', {
          tag: alarm.child('device_id').val() + '-co_alarm_state',
          body: 'CO has been detected by ' + alarm.child('name_long').val(),
          color: alarm.child('ui_color_state').val()
        });
      }
      break;
    }
    alarmState = state.val();
  });
}

/**
  Listen for low battery alarms and alert the user

*/
function listenForBatteryAlarms(alarm) {
  alarm.child('battry_health').ref().on('value', function (state) {

    // Don't show battery alerts if a more
    // important alert is already showing
    if ( state.val() === 'replace' &&
         alarm.smoke_alarm_state === 'ok' &&
         alarm.co_alarm_state === 'ok') {
      notify('Replace battery', {
        tag: alarm.child('device_id').val() + '-battry_health',
        body: 'The battery is low on ' + alarm.child('name_long').val(),
        color: alarm.child('ui_color_state').val()
      });
    }
  });
}

/**
  Start listening for changes on this account,
  update appropriate views as data changes.

  Note: this will only work in browsers that support notifications
  See http://caniuse.com/notifications for a current list.

*/
if ('Notification' in window) {
  dataRef.once('value', function (snapshot) {
    var smokeCOAlarms = snapshot.child('devices/smoke_co_alarms');
    window.smokeCOAlarms = smokeCOAlarms;
    for(var id in smokeCOAlarms.val()) {
      var alarm = smokeCOAlarms.child(id);
      listenForSmokeAlarms(alarm);
      listenForCOAlarms(alarm);
      listenForBatteryAlarms(alarm);
    }
  });
}
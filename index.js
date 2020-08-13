//Require
const spacetime = require('spacetime');
const informal = require('spacetime-informal');
const express = require('express');
//Website
const app = express();

//config
var configpath = './config.json';
var config = require(configpath);
function reloadConfig() {
  config = require(configpath);
}

//Define the port from the config.json file
var serverport = config["port"] || 3000;

//Current time in UTC
app.get('/time/now', (req, res) => {
  var zone = "ETC/UTC";
  var time = informal.find(zone);
  var reqbody = {};
  if(time == null) {
    reqbody = {
      error: true,
      errormessage: 'IncorrectTimezone'
    };
  } else {
    var d = spacetime.now(time);
    reqbody = {
      error: false,
      errormessage: null,
      timezone: time,
      datestring: d.unixFmt('yyyy-MM-dd'),
      day: d.date(),
      month: d.month(),
      year: d.year(),
      hour: d.hour(),
      minute: d.minute(),
      second: d.second(),
      ampm: d.ampm(),
      time24h: `${d.hour()}:${d.minute()}`,
      time12h: d.time(),
      dayname: d.dayName(),
      dayofyear: d.dayOfYear(),
      daytime: d.dayTime(),
      monthname: d.monthName(),
      quarter: d.quarter()
    };
  }
  return res.send(reqbody);
});

//Current time in certain timezone
app.get('/time/:timezone/now', (req, res) => {
  var zone = req.params.timezone;
  var time = informal.find(zone);
  var reqbody = {};
  if(time == null) {
    reqbody = {
      error: true,
      errormessage: 'IncorrectTimezone'
    };
  } else {
    var d = spacetime.now(time);
    reqbody = {
      error: false,
      errormessage: null,
      timezone: time,
      datestring: d.unixFmt('yyyy-MM-dd'),
      day: d.date(),
      month: d.month(),
      year: d.year(),
      hour: d.hour(),
      minute: d.minute(),
      second: d.second(),
      ampm: d.ampm(),
      time24h: `${d.hour()}:${d.minute()}`,
      time12h: d.time(),
      dayname: d.dayName(),
      dayofyear: d.dayOfYear(),
      daytime: d.dayTime(),
      monthname: d.monthName(),
      quarter: d.quarter()
    };
  }
  return res.send(reqbody);
});

//Time tomorrow morning in UTC
app.get('/time/tomorrow', (req, res) => {
  var zone = "ETC/UTC";
  var time = informal.find(zone);
  var reqbody = {};
  if(time == null) {
    reqbody = {
      error: true,
      errormessage: 'IncorrectTimezone'
    };
  } else {
    var d = spacetime.tomorrow(time);
    reqbody = {
      error: false,
      errormessage: null,
      timezone: time,
      datestring: d.unixFmt('yyyy-MM-dd'),
      day: d.date(),
      month: d.month(),
      year: d.year(),
      hour: d.hour(),
      minute: d.minute(),
      second: d.second(),
      ampm: d.ampm(),
      time24h: `${d.hour()}:${d.minute()}`,
      time12h: d.time(),
      dayname: d.dayName(),
      dayofyear: d.dayOfYear(),
      daytime: d.dayTime(),
      monthname: d.monthName(),
      quarter: d.quarter()
    };
  }
  return res.send(reqbody);
});

//Time tomorrow morning in certain timezone
app.get('/time/:timezone/tomorrow', (req, res) => {
  var zone = req.params.timezone;
  var time = informal.find(zone);
  var reqbody = {};
  if(time == null) {
    reqbody = {
      error: true,
      errormessage: 'IncorrectTimezone'
    };
  } else {
    var d = spacetime.tomorrow(time);
    reqbody = {
      error: false,
      errormessage: null,
      timezone: time,
      datestring: d.unixFmt('yyyy-MM-dd'),
      day: d.date(),
      month: d.month(),
      year: d.year(),
      hour: d.hour(),
      minute: d.minute(),
      second: d.second(),
      ampm: d.ampm(),
      time24h: `${d.hour()}:${d.minute()}`,
      time12h: d.time(),
      dayname: d.dayName(),
      dayofyear: d.dayOfYear(),
      daytime: d.dayTime(),
      monthname: d.monthName(),
      quarter: d.quarter()
    };
  }
  return res.send(reqbody);
});

//Certain date in a certain timezone
app.get('/time/:timezone/date/:year/:month/:day', (req, res) => {
  var zone = req.params.timezone;
  var year = req.params.year;
  var month = req.params.month;
  var date = req.params.day;
  var time = informal.find(zone);
  var reqbody = {};
  if(time == null) {
    reqbody = {
      error: true,
      errormessage: 'IncorrectTimezone'
    };
  } else {
    var d = spacetime([year, month, date], time);
    reqbody = {
      error: false,
      errormessage: null,
      timezone: time,
      datestring: d.unixFmt('yyyy-MM-dd'),
      day: d.date(),
      month: d.month(),
      year: d.year(),
      hour: d.hour(),
      minute: d.minute(),
      second: d.second(),
      ampm: d.ampm(),
      time24h: `${d.hour()}:${d.minute()}`,
      time12h: d.time(),
      dayname: d.dayName(),
      dayofyear: d.dayOfYear(),
      daytime: d.dayTime(),
      monthname: d.monthName(),
      quarter: d.quarter()
    };
  }
  return res.send(reqbody);
});

app.listen(serverport, () =>
  console.log(`App listening on port ${serverport}!`),
);

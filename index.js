const spacetime = require('spacetime');
const informal = require('spacetime-informal');
const express = require('express');
const app = express();

var configpath = './config.json';
var config = require(configpath);
function reloadConfig() {
  config = require(configpath);
}

var serverport = config[port] || 3000;

app.get('/time/now', (req, res) => {
  var reqbody = timeNow("Etc/UTC");
  return res.send(reqbody);
});
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
      year: d.tear(),
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
app.get('/time/:timezone/bydate/:year/:month/:day', (req, res) => {
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
    var d = spacetime([year, month, day], time);
    reqbody = {
      error: false,
      errormessage: null,
      timezone: time,
      datestring: d.unixFmt('yyyy-MM-dd'),
      day: d.date(),
      month: d.month(),
      year: d.tear(),
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

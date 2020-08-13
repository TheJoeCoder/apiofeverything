const spacetime = require('spacetime');
const informal = require('spacetime-informal');
const express = require('express');
const app = express();

function timeNow(zone) {
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
      day: d.unixFmt('dd'),
      dayname: d.dayName(),
      dayofyear: d.dayOfYear(),
      month: d.unixFmt('MM'),
      monthname: d.monthName(),
      year: d.unixFmt('yyyy')
    };
  }
  return reqbody;
}
function timeOnDate(zone, year, month, day) {
  var time = informal.find(zone);
  var reqbody = {};
  if(time == null) {
    reqbody = {
      error: true,
      errormessage: 'IncorrectTimezone'
    };
  } else {}
}

app.get('/time/now', (req, res) => {
  var reqbody = timeNow("Etc/UTC");
  return res.send(reqbody);
});
app.get('/time/:timezone/now', (req, res) => {
  var reqbody = timeNow(req.params.timezone);
  return res.send(reqbody);
});
app.get('/time/:timezone/:year/:month/:date', (req, res) => {

});

app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);

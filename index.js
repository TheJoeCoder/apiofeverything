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

//GetCSV from https://github.com/natn2323/parzival/blob/master/public/javascript/DBManager.js
function getCSV(filelocation) {
  return new Promise(function(resolve, reject) {
    require('fs').readFile(filelocation, "utf8", function(err, data) {
      if (err) {
        reject(err);
      } else {
        let lines = data.split('\n'),
            columns = [],
            item = {},
            items = [];

        for(let i = 0; i < lines.length - 1; i++) {
          // Skip the row of column headers
          if(i === 0) continue;

          let line = lines[i],
              columns = line.split(',');

          let postcode = columns[0],
              status = columns[1],
              usertype = columns[2],
              easting = columns[3],
              northing = columns[4],
              positional_quality_indicator = columns[5],
              country = columns[6],
              latitude = columns[7],
              longitude = columns[8],
              postcode_no_space = columns[9],
              postcode_fixed_width_seven = columns[10],
              postcode_fixed_width_eight = columns[11],
              postcode_area = columns[12],
              postcode_district = columns[13],
              postcode_sector = columns[14],
              outcode = columns[15],
              incode = columns[16];

          menuItems.push({
            "postcode": postcode,
            "status": status,
            "usertype": usertype
          });

        } // end for
        resolve(menuItems);

      } // end else
    }); // end readFile
  }); // return promise
} // end getCSV

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

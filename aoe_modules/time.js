//Require
const spacetime = require('spacetime');
const informal = require('spacetime-informal');

function genError(msg) {
  var reqbody = {
    error: true,
    errormessage: msg
  };
}
function genReqBody(time, d) {
  var reqbody = {
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
  return reqbody;
}

const plugininfo = {
  "name": "time",
  "description": "Time and timezones",
  "author": "TheJoeCoder",
  "version": "1.0.0",
  "apicalls": {
    "/api/time": "Gets now in timezone UTC",
    "/api/time/now": "Gets now in timezone UTC",
    "/api/time/:timezone": "Gets now in timezone :timezone",
    "/api/time/:timezone/now": "Gets now in timezone :timezone",
    "/api/time/tomorrow": "Gets tomorrow in timezone UTC",
    "/api/time/:timezone/tomorrow": "Gets tomorrow in timezone :timezone",
    "/api/time/date/:year/:month/:day": "Gets :year-:month-:day in UTC",
    "/api/time/:timezone/date/:year/:month/:day": "Gets date :year-:month-:day in :timezone"
  }
};

function plugininit(app) {
  //Current time in UTC
  app.get('/api/time', (req, res) => {
    var zone = "ETC/UTC";
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime.now(time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });
  app.get('/api/time/now', (req, res) => {
    var zone = "ETC/UTC";
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime.now(time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });

  //Current time in certain timezone
  app.get('/api/time/:timezone', (req, res) => {
    var zone = req.params.timezone;
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime.now(time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });
  app.get('/api/time/:timezone/now', (req, res) => {
    var zone = req.params.timezone;
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime.now(time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });

  //Time tomorrow morning in UTC
  app.get('/api/time/tomorrow', (req, res) => {
    var zone = "ETC/UTC";
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime.tomorrow(time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });

  //Time tomorrow morning in certain timezone
  app.get('/api/time/:timezone/tomorrow', (req, res) => {
    var zone = req.params.timezone;
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime.tomorrow(time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });

  //Certain date in UTC
  app.get('/api/time/date/:year/:month/:day', (req, res) => {
    var zone = "ETC/UTC";
    var year = req.params.year;
    var month = req.params.month;
    var date = req.params.day;
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime([year, month, date], time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });

  //Certain date in a certain timezone
  app.get('/api/time/:timezone/date/:year/:month/:day', (req, res) => {
    var zone = req.params.timezone;
    var year = req.params.year;
    var month = req.params.month;
    var date = req.params.day;
    var time = informal.find(zone);
    var reqbody = {};
    if(time == null) {
      reqbody = genError('IncorrectTimezone');
    } else {
      var d = spacetime([year, month, date], time);
      reqbody = genReqBody(time, d);
    }
    return res.send(reqbody);
  });
}

exports.Info = plugininfo;
exports.Init = plugininit;

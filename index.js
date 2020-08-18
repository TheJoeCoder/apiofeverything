//Require
const express = require('express');
const path = require('path');
//Website
const app = express();

var packagejson = require('./package.json');

//config
var configpath = './config.json';
var config = require(configpath);
function reloadConfig() {
  config = require(configpath);
}

//Define the port from the config.json file
var serverport = config["port"] || 3000;


var enabledmodules = [];

var normalizedPath = path.join(__dirname, "aoe_modules");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  var pl = require("./aoe_modules/" + file);
  enabledmodules.push(pl.Info);
  pl.Init(app);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/page-src/index.html'));
});

app.get('/sys/modules', (req, res) => {
  return res.send(enabledmodules);
});

app.get('/sys/modules/prettyprint', (req, res) => {
  var names = "";
  for (var i = 0; i < enabledmodules.length; i++) {
    enabledmodules[i];
    var strcomp = "",
      tab = "&nbsp;&nbsp;&nbsp;&nbsp;",
      name = enabledmodules[i]["name"],
      version = enabledmodules[i]["version"],
      desc = enabledmodules[i]["description"],
      author = enabledmodules[i]["author"];
    strcomp = "Module ID " + i + ": <br>" +
      tab + "Name: " + name + "<br>" +
      tab + "Version: " + version + "<br>" +
      tab + "Author: " + author + "<br>" +
      tab + "Description: " + desc + "<br>";
    names = names + strcomp;
  }
  return res.send(names);
});

app.get('/sys/info', (req, res) => {
  var bod = {
    serverversion: packagejson["version"],
    servername: config["server-name"],
    serverowner: config["server-owner"]
  };
  return res.send(bod);
});

app.listen(serverport, () =>
  console.log(`App listening on port ${serverport}!`),
);

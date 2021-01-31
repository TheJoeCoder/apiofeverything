# API Of Everything

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5DFKLGMU7QAMU&source=url)

**Warning**: This is just a fun project, and it doesn't work well, if at all. DON'T USE IT!!!!

APIOfEverything is a web API with some random things.

There is a simple modules system (which is still being worked on) to allow for easy expansion.

## How to install

1. Clone the repository

```
git clone https://github.com/TheJoeCoder/apiofeverything
cd apiofeverything
```

2. Install the packages

```
npm install
```

3. Open the config.json file in your favourite text editor.

```json
{
  "//": "'port' - Port of the embedded webserver - Change this to the port that you want the API to run on.",
  "port":3000,
  "//": "'server-name' - Name of the server displayed on public pages - Change this if you wish",
  "server-name": "Untitled",
  "//": "'server-owner' - Owner of the server displayed on public pages - Change this if you wish",
  "server-owner": "Anonymous"
}
```

4. Launch the web server

```
npm start
```

## For developers who want to expand this

There is a simple plugin manager which looks for js files in the `aoe_modules` directory.

You can either only use the modules in nodejs or ask the users of your module to run a `npm install` command when first enabling it.

Here's how you use it.

```javascript

const plugininfo = {
  "name": "someplugin",
  "description": "Some plugin that does stuff",
  "author": "SomePerson",
  "version": "1.0.0",
  "apicalls": {
    "/api/someplugin/something/:someparam": "Sends back :someparam"
  }
};

function plugininit(restapi) {
  //Init function - Add all of your restapi.enable() here
  restapi.enable(plugininfo, '/something/:someparam' (req, res) => { // /api/<pluginname>/something/:someparam
    return res.send(req.params.someparam);
  });
}

exports.Info = plugininfo;
exports.Init = plugininit;

```

## How it works (for developers)

If you want to use this in your project, feel free to. Here's a guide.

1. Make a web request to the apiofeverything server.

2. Check if the response is an error by seeing if the JSON output's error is false/true

3. Do stuff with the other output.

### Example Output from the apiofeverything server

#### Example output of /api/time/now

```json
{
  "error": false,
  "errormessage": null,
  "timezone": "ETC/UTC",
  "datestring":"2020-08-13",
  "day":"13",
  "dayname":"thursday",
  "dayofyear":226,
  "daytime":"afternoon",
  "month":"08",
  "monthname":"august",
  "year":"2020",
  "hour":15,
  "minute":39,
  "second":5,
  "time24h":"15:39",
  "time12h":"3:39pm"
}
```

#### Example output of an incorrect timezone (/api/time/L/now)

```json
{
  "error": true,
  "errormessage": "IncorrectTimezone",
}
```

## Credit

Timezone stuff: [Spacetime](https://github.com/spencermountain/spacetime)

UK Postcode data: [GetTheData](https://www.getthedata.com/open-postcode-geo)

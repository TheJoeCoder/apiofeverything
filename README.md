# API Of Everything

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5DFKLGMU7QAMU&source=url)

Warning: This is still in alpha so please do not use this.

APIOfEverything is a web API with a few things that could possibly be useful in some code.

## How to install

When I've set up a site with the API on you won't necessarily need to install this yourself but in the meantime:

1. Clone the repository

```
git clone https://github.com/TheJoeCoder/apiofeverything

cd apiofeverything
```

2. Install the packages

```
npm install
```

3. Launch the web server

```
npm start
```


## How it works (for developers)

If you want to use this in your project, feel free to. Here's a guide.

1. Make a web request to the apiofeverything server.

2. Check if the response is an error by seeing if the JSON output's error is false

3. Do stuff with the other output.

### Example Output from the apiofeverything server

#### Example output of /time/now

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

#### Example output of an incorrect timezone (/time/L/now)

```json
{
  "error": true,
  "errormessage": "IncorrectTimezone",
}
```

## Credit

Timezone stuff: [Spacetime](https://github.com/spencermountain/spacetime)

UK Postcode data: [GetTheData](https://www.getthedata.com/open-postcode-geo)

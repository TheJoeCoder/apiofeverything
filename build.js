//Required libraries
const fs = require('fs');
const sqlite3 = require('sqlite3');

console.log("[INFO] Checking if database exists...");
if (fs.existsSync('./database.db')) {
  fs.unlink('./database.db',function(err){
       if(err) return console.log(err);
       console.info('[INFO] Existing database file has been deleted.');
  });
}

let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.info("[INFO] Database connection succeeded.");

  var sql = "CREATE TABLE ukpostcodes (id INTEGER NOT NULL PRIMARY KEY, postcode TEXT NOT NULL, status TEXT NOT NULL, usertype TEXT NOT NULL, easting INTEGER, northing INTEGER, positional_quality_indicator INTEGER NOT NULL, country TEXT NOT NULL, latitude NUMERIC NOT NULL, longitude NUMERIC NOT NULL, postcode_no_space TEXT NOT NULL, postcode_fixed_width_seven TEXT NOT NULL, postcode_fixed_width_eight TEXT NOT NULL, postcode_area TEXT NOT NULL, postcode_district TEXT NOT NULL, postcode_sector TEXT NOT NULL, outcode TEXT NOT NULL, incode TEXT NOT NULL);";

  console.info("[INFO] Creating table for postcodes...");
  db.run(sql, ['C'], function(err) {
    if (err) {
      console.error("[ERROR] Error while creating table!");
      return console.error("[ERROR] " + err.message);
    }
    console.info("[INFO] Created table for postcodes.");

    var lineslength = 0;

    //partly borrowed from https://github.com/natn2323/parzival/blob/master/public/javascript/DBManager.js
    function addPostcodes() {
      return new Promise(function(resolve, reject) {
        fs.readFile("./postcodes_gb.csv", "utf8", function(err, data) {
          if (err) {
            console.error(err.message);
          } else {
            let lines = data.split('\n'),
                columns = [],
                item = {},
                items = [];
            var lineslength = lines.length - 1;

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
                items.push({
                  "postcode": postcode,
                  "status": status,
                  "usertype": usertype,
                  "easting": easting,
                  "northing": northing,
                  "positional_quality_indicator": positional_quality_indicator,
                  "country": country,
                  "latitude": latitude,
                  "longitude": longitude,
                  "postcode_no_space": postcode_no_space,
                  "postcode_fixed_width_seven": postcode_fixed_width_seven,
                  "postcode_fixed_width_eight": postcode_fixed_width_eight,
                  "postcode_area": postcode_area,
                  "postcode_district": postcode_district,
                  "postcode_sector": postcode_sector,
                  "outcode": outcode,
                  "incode": incode
              });
            }
            resolve(items);
          }
        });
      });
    }

    var postcodesstart = process.hrtime();

    addPostcodes().then(function(result) {
      for(let i = 0; i < result.length; i++) {
          let unit = result[i];
          db.run("INSERT INTO ukpostcodes (postcode, status, usertype, easting, northing, positional_quality_indicator, country, latitude, longitude, postcode_no_space, postcode_fixed_width_seven, postcode_fixed_width_eight, postcode_area, postcode_district, postcode_sector, outcode, incode) VALUES ($postcode, $status, $usertype, $easting, $northing, $positional_quality_indicator, $country, $latitude, $longitude, $postcode_no_space, $postcode_fixed_width_seven, $postcode_fixed_width_eight, $postcode_area, $postcode_district, $postcode_sector, $outcode, $incode);",
          {
            $postcode: unit.postcode,
            $status: unit.status,
            $usertype: unit.usertype,
            $easting: unit.easting,
            $northing: unit.northing,
            $positional_quality_indicator: unit.positional_quality_indicator,
            $country: unit.country,
            $latitude: unit.latitude,
            $longitude: unit.longitude,
            $postcode_no_space: unit.postcode_no_space,
            $postcode_fixed_width_seven: unit.postcode_fixed_width_seven,
            $postcode_fixed_width_eight: unit.postcode_fixed_width_eight,
            $postcode_area: unit.postcode_area,
            $postcode_district: unit.postcode_district,
            $postcode_sector: unit.postcode_sector,
            $outcode: unit.outcode,
            $incode: unit.incode
          });
        }
        db.close();
        console.info("[INFO] Done.");
    });
  });
});

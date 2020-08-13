//Required libraries
const fs = require('fs');
const sqlite3 = require('sqlite3');

console.log("[INFO] Checking if database exists...");
fs.stat('./database.db', function (err, stats) {
  if (err) {
      return console.error(err);
  }
  fs.unlink('./database.db',function(err){
       if(err) return console.log(err);
       console.info('[INFO] Existing database file has been deleted.');
  });
});
console.info("[INFO] Creating Database file...");
let createdb = new sqlite3.Database('./database.db', sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.info("[INFO] Created database file.");
});
createdb.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.info("[INFO] DB Creation connection has been closed.");
});

let db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.info("[INFO] Database connection succeeded.");
});

var sql = "CREATE TABLE ukpostcodes (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, postcode TEXT NOT NULL, status TEXT NOT NULL, usertype TEXT NOT NULL, easting INTEGER, northing INTEGER, positional_quality_indicator INTEGER NOT NULL, country TEXT NOT NULL, latitude NUMERIC NOT NULL, longitude NUMERIC NOT NULL, postcode_no_space TEXT NOT NULL, postcode_fixed_width_seven TEXT NOT NULL, postcode_fixed_width_eight TEXT NOT NULL, postcode_area TEXT NOT NULL, postcode_district TEXT NOT NULL, postcode_sector TEXT NOT NULL, outcode TEXT NOT NULL, incode TEXT NOT NULL);";

console.info("[INFO] Creating table for postcodes...");
db.run(sql, ['C'], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.info("[INFO] Created table for postcodes.");
});

var postcodesstart = process.hrtime();

var lineslength = 0;

fs.readFile("./postcodes_gb.csv", "utf8", function(err, data) {
  if (err) {
    console.error(err.message);
  } else {
    let lines = data.split('\n'),
        columns = [],
        item = {};
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

          var sql = `INSERT INTO ukpostcodes (postcode, status, usertype, easting, northing, positional_quality_indicator, country, latitude, longitude, postcode_no_space, postcode_fixed_width_seven, postcode_fixed_width_eight, postcode_area, postcode_district, postcode_sector, outcode, incode) VALUES (${postcode}, ${status}, ${usertype}, ${easting}, ${northing}, ${positional_quality_indicator}, ${country}, ${latitude}, ${longitude}, ${postcode_no_space}, ${postcode_fixed_width_seven}, ${postcode_fixed_width_eight}, ${postcode_area}, ${postcode_district}, ${postcode_sector}, ${outcode}, ${incode});`;

          db.run(sql, ['C'], function(err) {
            if (err) {
              return console.error(err.message);
            }
            console.info(`[INFO] Inserted row number ${i}`);
          });

    } // end for
  } // end else
}); // end readFile

console.info(`[INFO] Inserted ${lineslength} lines into the database.`);
var hrend = process.hrtime(hrstart);
console.info('[INFO] Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.info("[INFO] Database connection has been closed.");
});

console.info("[INFO] Done.");

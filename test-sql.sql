CREATE TABLE ukpostcodes (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  postcode TEXT NOT NULL,
  status TEXT NOT NULL,
  usertype TEXT NOT NULL,
  easting INTEGER,
  northing INTEGER,
  positional_quality_indicator INTEGER NOT NULL,
  country TEXT NOT NULL,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  postcode_no_space TEXT NOT NULL,
  postcode_fixed_width_seven TEXT NOT NULL,
  postcode_fixed_width_eight TEXT NOT NULL,
  postcode_area TEXT NOT NULL,
  postcode_district TEXT NOT NULL,
  postcode_sector TEXT NOT NULL,
  outcode TEXT NOT NULL,
  incode TEXT NOT NULL
);
CREATE TABLE ukpostcodes (id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, postcode TEXT NOT NULL, status TEXT NOT NULL, usertype TEXT NOT NULL, easting INTEGER, northing INTEGER, positional_quality_indicator INTEGER NOT NULL, country TEXT NOT NULL, latitude NUMERIC NOT NULL, longitude NUMERIC NOT NULL, postcode_no_space TEXT NOT NULL, postcode_fixed_width_seven TEXT NOT NULL, postcode_fixed_width_eight TEXT NOT NULL, postcode_area TEXT NOT NULL, postcode_district TEXT NOT NULL, postcode_sector TEXT NOT NULL, outcode TEXT NOT NULL, incode TEXT NOT NULL);

INSERT INTO ukpostcodes (
  postcode,
  status,
  usertype,
  easting,
  northing,
  positional_quality_indicator,
  country,
  latitude,
  longitude,
  postcode_no_space,
  postcode_fixed_width_seven,
  postcode_fixed_width_eight,
  postcode_area,
  postcode_district,
  postcode_sector,
  outcode,
  incode
) VALUES (
  ${postcode},
  ${status},
  ${usertype},
  ${easting},
  ${northing},
  ${positional_quality_indicator},
  ${country},
  ${latitude},
  ${longitude},
  ${postcode_no_space},
  ${postcode_fixed_width_seven},
  ${postcode_fixed_width_eight},
  ${postcode_area},
  ${postcode_district},
  ${postcode_sector},
  ${outcode},
  ${incode}
);

INSERT INTO ukpostcodes (postcode, status, usertype, easting, northing, positional_quality_indicator, country, latitude, longitude, postcode_no_space, postcode_fixed_width_seven, postcode_fixed_width_eight, postcode_area, postcode_district, postcode_sector, outcode, incode) VALUES ($postcode, $status, $usertype, $easting, $northing, $positional_quality_indicator, $country, $latitude, $longitude, $postcode_no_space, $postcode_fixed_width_seven, $postcode_fixed_width_eight, $postcode_area, $postcode_district, $postcode_sector, $outcode, $incode);

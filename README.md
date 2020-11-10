# Portland, Oregon Metro COVID-19 by Zip Code Map

# Data Sources

These data are provided as-is with no warranty expressed or implied.

Case data from [Oregon Health Authority](https://govstatus.egov.com/OR-OHA-COVID-19). OHA releases zipcode level data weekly (usually on Wednesdays) in their [Oregon COVID-19 Weekly Report](https://www.oregon.gov/oha/covid19/Pages/Healthcare-Partners.aspx#projections).

This data is extracted from the PDF using [Tabula](https://tabula.technology/) and manually spot checked.

Zipcode shapes come from Metro's GIS PDX open data site [Zip Code Boundaries feature layer](https://gis-pdx.opendata.arcgis.com/datasets/71fa9b7ab6a040939d7c0339287fa436_1), converted to Web Mercator coordinates via gdal. Disclaimer, [ZIP codes are not areas](http://www.georeference.org/doc/zip_codes_are_not_areas.htm).

# Developing

Built with twine and baling wire and [vega lite](https://vega.github.io/vega-lite).

# Contributing

Contributions welcome, but please expect slow replies.

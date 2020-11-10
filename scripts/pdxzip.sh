#! /bin/sh
# Data pipeline for Portland Metro Zip Code Boundaries
# Source data: https://gis-pdx.opendata.arcgis.com/datasets/71fa9b7ab6a040939d7c0339287fa436_1
# Thanks to Mike Bostock https://bost.ocks.org/mike/map/
ogr2ogr -F GeoJSON -t_srs EPSG:4326 pdxzip.json Zip_Code_Boundaries-shp/Zip_Code_Boundaries.shp
npx topojson pdxzip.json > pdxzip.topo.json

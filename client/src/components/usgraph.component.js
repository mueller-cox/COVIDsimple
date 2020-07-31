import React from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

// url to a valid topojson file
const geoData = require('../geodata/states_topojson.json')
  //"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// conversion map from geo id to state abbreviation
const IDtoXX = require('../geodata/stateids.json');

const USGraph = () => {
    //console.log('rendering graph')
    return (
        <ComposableMap projection="geoAlbersUsa" style={{width: "100%", height: "75vh", }}> 
            <Geographies geography={geoData}>
            {({geographies}) => geographies.map(geo =>
                <Geography key={geo.rsmKey} geography={geo} />
            )}
            </Geographies>
        </ComposableMap>
  )
}

export default USGraph;
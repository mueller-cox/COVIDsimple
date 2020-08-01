import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import {
    scaleQuantile,
    //scaleQuantize
} from "d3-scale";
import { Modes } from './national-view.component';

const moment = require('moment'); // for formatting date

// Import geodata maps
const geoData = require('../geodata/states_topojson.json') // url to a valid topjson file
const IDtoXX = require('../geodata/state_ids.json');        // map from geo id to state abbreviation
const stateToPop = require('../geodata/state_pops.json');  // map from state abbrev. to population

/**
 * Adjust statistic depending on data mode user has selected
 */
function normalizeStatistic(statistic, per_capita, state) {
    let divisor = per_capita ? stateToPop[state]/100000 : 1;
    return statistic / divisor;
}

/* format date to YYYYMMDD */
function formatDate(date) {
    return moment(date).format('YYYYMMDD');
}

const USGraph = (props) => {

    const { state } = props;
    const data = state.data ? state.data[formatDate(state.date)] : null;
    //console.log('rendering graph', data);
    
    // If no data loaded or available for selected date, return placeholder view
    if (!data) { 
        return (
            <>
            <ComposableMap projection="geoAlbersUsa" style={{width: "100%", height: "75vh", }}> 
                <Geographies geography={geoData}>
                {({geographies}) => geographies.map(geo =>
                    <Geography key={geo.rsmKey} geography={geo} />
                )}
                </Geographies>
            </ComposableMap>
            <h2>{ data === null ? 'Loading...' : 'No data available' }</h2>
            </>
        );
    // otherwise graph by user selection:
    } else {
        const { radioSelected, mode, per_capita } = state ; // unpack relevant variables from state
        const statistic = mode === Modes.INC ? radioSelected + Modes.INC : radioSelected;

        // set color scale based on data to graph
        const colorScale = 
            scaleQuantile()
            .domain(Object.values(data).map(entry => 
                normalizeStatistic(entry[statistic], per_capita, entry['state'])
            ))
            .range([
            "#ffedea",
            "#ffcec5",
            "#ffad9f",
            "#ff8a75",
            "#ff5533",
            "#e2492d",
            "#be3d26",
            "#9a311f",
            "#782618"]);

        return (
            <ComposableMap projection="geoAlbersUsa" style={{width: "100%", height: "75vh", }}> 
                <Geographies geography={geoData}>
                {({geographies}) => geographies.map(geo => {
                    const cur = data[IDtoXX[geo.id]];
                    //console.log('graphing', cur['state'], statistic);
                    let normalized = cur ? normalizeStatistic(cur[statistic], per_capita, cur['state']): '#FFF9F9';
                    //console.log(`${cur[statistic]} normalized to ${normalized} for ${cur['state']}`);
                    return (
                        <Geography 
                            key={geo.rsmKey} 
                            geography={geo}
                            fill={cur ? colorScale(normalized) : normalized}
                        />
                    );
                })}
                </Geographies>
            </ComposableMap>
        )
    }
}

export default USGraph;
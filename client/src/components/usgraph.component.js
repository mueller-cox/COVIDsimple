import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { Modes } from './national-view.component';

const d3 = require('d3');           // for coloring graph
const moment = require('moment');   // for formatting date

// Import geodata maps
const geoData = require('../geodata/states_topojson.json')  // url to a valid topojson file
const IDtoState = require('../geodata/state_ids.json');     // map from geo id to state abbreviation
const stateToPop = require('../geodata/state_pops.json');   // map from state abbrev. to population

const USGraph = (props) => {

    /* dynamically resize graph on window resize */
    const [graphHeight, setGraphHeight] = useState(window.innerWidth <= 768 ? 'auto' : '80vh');
    
    function handleResize() {
        setGraphHeight(window.innerWidth <= 768 ? 'auto' : '80vh')
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return _ => { window.removeEventListener('resize', handleResize) }
    })

    const { state, setTooltip } = props;
    const data = state.data ? state.data[formatDate(state.date)] : null; // get data from requested date

    // console.log('rendering graph', data);
    // If no data loaded or available for selected date, return placeholder view
    if (!data) { 
        return (
            <>
            {/* data-tip attribute defines where tool-tip displays its data */}
            <ComposableMap 
                projection="geoAlbersUsa" 
                style={{width: "100%", height: graphHeight, }}
            > 
                <Geographies data-tip='' geography={geoData}>
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
        const statistic = (mode === Modes.INC ? radioSelected + Modes.INC : radioSelected);

        // set color scale based on data available to graph
        const colorDomain = 
            Object.values(data)
            .filter(entry => entry[statistic] !== null) // only entries with stat available affect scale
            .map(entry => normalizeStatistic(entry[statistic], per_capita, entry['state']));
         

        const colorScale = d3.scaleSequentialQuantile(colorDomain, d3.interpolateBlues)

        return (
            <>
            <ComposableMap 
                data-tip='' 
                projection="geoAlbersUsa" 
                style={{width: "100%", height: graphHeight, }}
            > 
                <Geographies geography={geoData}>
                {({geographies}) => geographies.map(geo => {
                    const cur = data[IDtoState[geo.id]]; // data entry for state on graph date
                    const hasData = cur !== undefined;
                    const hasStat = hasData ? cur[statistic] !== null : false;
                    //console.log('graphing', cur['state'], statistic);
                    let normalized = // normalize statistic based on per_capita flag and state population
                        hasStat ? normalizeStatistic(cur[statistic], per_capita, cur['state']) : 0;
                    //console.log(`${cur[statistic]} normalized to ${normalized} for ${cur['state']}`);
                    return (
                        <Geography 
                            key={geo.rsmKey} 
                            geography={geo}
                            fill={hasStat ? colorScale(normalized) : 0}
                            onMouseEnter={() => {
                                //console.log('normalized value', normalized);
                                if (!hasData) setTooltip(`No data available`);
                                else if (!hasStat) setTooltip(`Selected statistic not reported`);
                                else setTooltip(formatNumber(normalized));  
                            }}
                            onMouseLeave={() => setTooltip('')}
                            style={{
                                alt: `${geo.rsmKey}`
                            }}
                        />
                    );
                })}
                </Geographies>
            </ComposableMap>
            </>
        )
    }
}

/**
 * Adjust statistic depending on data mode user has selected
 * and passed state US state (as two character abbreviation)
 */
function normalizeStatistic(statistic, per_capita, state) {
    let divisor = per_capita ? stateToPop[state]/100000 : 1;
    return statistic / divisor;
}

/* format date to YYYYMMDD (as data passed to USGraph is keyed by YYYYMMDD strings) */
function formatDate(date) {
    return moment(date).format('YYYYMMDD');
}
/* format number to string, adding comma's rounding to max of 2 decimal places for tooltip display */
function formatNumber(n) {
    return Number(n.toFixed(n % 1 === 0 ? 0 : 2)).toLocaleString();
}

/**
 * determine if Graphs are equivalent and should not be re-rendered 
 *  (essentially so that we don't re-render whenever tool-tip changes) 
*/
function areEqual(prevProps, nextProps) {
    //console.log('areEqual?');
    const p = prevProps.state, n = nextProps.state;
    return compareByProps(p, n, ['data', 'radioSelected', 'mode', 'per_capita', 'date'])
}

/* determine if objects are equal by comparing a subset of their properties */
function compareByProps(obj1, obj2, proplist) {
    for (const prop of proplist) {
        if (obj1[prop] !== obj2[prop]) return false;
    }    
    return true;        
}

/* export memoized component so that it may be re-rendered conditionally on prevProps and nextProps */
export default React.memo(USGraph, areEqual);
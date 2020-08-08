import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Modes } from "./national-view.component";
import { legendColor } from "d3-svg-legend";

/* import modules */
const d3 = require("d3"); // for coloring graph
const moment = require("moment"); // for formatting date

// Import geodata maps
const geoData = require("../geodata/states_topojson.json"); // url to a valid topojson file
const IDtoState = require("../geodata/state_ids.json"); // map from geo id to state abbreviation
const stateToPop = require("../geodata/state_pops.json"); // map from state abbrev. to population

const USGraph = (props) => {
    /* dynamically resize graph on window resize */
    const [graphHeight, setGraphHeight] = useState(
        window.innerWidth <= 768 ? "auto" : "80vh"
    );

    function handleResize() {
        setGraphHeight(window.innerWidth <= 768 ? "auto" : "80vh");
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return (_) => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const { state, setTooltip } = props; // unpack props
    const { radioSelected, mode, per_capita, date } = state; // unpack relevant variables from state prop

    /* Get data from requested date */
    let tmp_data = state.data ? state.data[formatDate(date)] : null;

    /* determine requested statistic based on data mode :
     *  (if user has selected daily increase or weekly rolling, use <radioSelected>Increase as statistic) */
    const statistic =
        mode === Modes.INC || mode === Modes.ROL
            ? radioSelected + Modes.INC
            : radioSelected;
    //console.log('selected statistic', statistic)

    //console.log('pre-roll data', data)
    /* aggregate weekly data if weekly rolling mode is selected */
    const data =
        tmp_data && mode === Modes.ROL
            ? rollData(state.data, statistic, date)
            : tmp_data;

    // console.log('rendering graph with data', data);
    // If no data loaded or available for selected date, return placeholder view
    if (!data) {
        d3.select("svg").select(".legend").remove(); // clear any pre-existing legend
        return (
            <>
                {/* data-tip attribute (in <Geographies>) defines where tool-tip displays its data */}
                <ComposableMap
                    projection="geoAlbersUsa"
                    style={{ width: "100%", height: graphHeight }}
                >
                    <Geographies data-tip="" geography={geoData}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} />
                            ))
                        }
                    </Geographies>
                </ComposableMap>
                <h2 className="flex-text">
                    {data === null ? "Loading..." : "No data available"}
                </h2>
            </>
        );
        // otherwise graph by user selection:
    } else {
        // set color scale based on data available to graph
        const colorDomain = Object.values(data)
            .filter((entry) => entry[stripInc(statistic)] !== null) // only entries with stat available affect scale
            .map((entry) =>
                normalizeStatistic(entry[statistic], per_capita, entry.state)
            );
        //console.log('colorDomain', colorDomain);

        const colorRange = d3.interpolateBlues;
        const colorScale = d3.scaleSequentialQuantile(colorDomain, colorRange);

        /* create an analogous discrete scale for the legend */
        const legendRange = d3.quantize(d3.interpolateBlues, 8);
        const legendScale = d3
            .scaleQuantile()
            .domain(colorDomain)
            .range(legendRange);

        /**
         * Construct a legend at the top of the previous graph's svg element,
         * into which the new USGraph component will also render
         */
        const svg = d3.select("svg");
        svg.select(".legend").remove();             // remove any prior legend
        svg.append("g").attr("class", "legend");    // generate a new legend
        //.attr("transform", "translate(0,0)");

        const legendSequential = legendColor()
            .labelFormat(d3.format(".2s"))
            .labelWrap(98)
            .shapeWidth(98.5)
            .orient("horizontal")
            .scale(legendScale);
        // .title(radioSelected)
        // console.log('legendSequential', legendSequential)

        if (colorDomain.length > 0) { // populate legend with colorData if it exists
            svg.select(".legend").call(legendSequential);
        } else {
            // else remove legend if no data is being displayed
            svg.select(".legend").remove();
        }
        return ( // Render the US Map
            <>
                <ComposableMap
                    data-tip="" // for tooltip
                    projection="geoAlbersUsa"
                    style={{ width: "100%", height: graphHeight }}
                >
                    <Geographies geography={geoData}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const cur = data[IDtoState[geo.id]]; // data entry for state on graph date
                                const hasData = cur !== undefined;
                                const hasStat = hasData
                                    ? // strip increasing modifier to determine stat's true availability
                                      cur[stripInc(statistic)] !== null
                                    : false;
                                //console.log('graphing', cur['state'], statistic);

                                // normalize statistic based on per_capita flag and state population
                                let normalized = hasStat
                                    ? normalizeStatistic(
                                          cur[statistic],
                                          per_capita,
                                          cur.state
                                      )
                                    : 0;
                                //console.log(`${cur[statistic]} normalized to ${normalized} for ${cur['state']}`);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={
                                            hasStat
                                                ? /* use legendScale for colorDomain's of length === 1 to properly color singleton with
                                                    a discrete rather than sequential scale */
                                                  colorDomain.length > 1
                                                    ? colorScale(normalized)
                                                    : legendScale(normalized)
                                                : 0
                                        }
                                        /* desktop tooltip handlers */
                                        onMouseEnter={() =>
                                            setTooltip(
                                                selectTooltip(
                                                    hasData,
                                                    hasStat,
                                                    normalized
                                                )
                                            )
                                        }
                                        onMouseLeave={() => setTooltip("")}
                                        /* mobile tooltip handlers (bugged) */
                                        onTouchStart={() =>
                                            setTooltip(
                                                selectTooltip(
                                                    hasData,
                                                    hasStat,
                                                    normalized
                                                )
                                            )
                                        }
                                        onTouchEnd={() => setTooltip("")}
                                        style={{
                                            alt: `${geo.rsmKey}`,
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ComposableMap>
                {colorDomain.length === 0 && (
                    <h2 className="flex-text">No data available</h2>
                )}
            </>
        );
    }
};

/**
 * Adjust statistic depending on data mode user has selected
 * and passed state US state (as two character abbreviation)
 */
function normalizeStatistic(statistic, per_capita, state) {
    let divisor = per_capita ? stateToPop[state] / 100000 : 1;
    return statistic / divisor;
}

/**
 * Aggregate statistic data from preceeding week into result: resData
 *    resData mirrors structure of a rawData entry but with
 *    resData[statistic] = sum(rawData[date - i][statistic]) for days i in [0...6]
 *  date0 must be a date for which rawData has data
 */
function rollData(rawData, statistic, date0) {
    const ONE_DAY = 1000 * 60 * 60 * 24; // millisecs in one day
    //console.log('rolling data')
    //console.log('rawData', rawData[formatDate(date0)]);
    let resData = JSON.parse(JSON.stringify(rawData[formatDate(date0)])); // make deep copy to not mutate rawData
    //console.log('resData', resData);
    //console.log('did clone?', resData !== rawData[formatDate(date0)])
    for (let days_ago = 1; days_ago < 7; days_ago++) {
        let curDate = new Date();
        curDate.setTime(date0.getTime() - days_ago * ONE_DAY);
        //console.log('date0', date0, 'curDate', curDate);

        let curData = rawData[formatDate(curDate)];
        //console.log('curData', curData);
        if (!curData) break; // don't reach back prior to first day of available data

        for (let [state, stateEntry] of Object.entries(curData)) {
            let priorStat = stateEntry[statistic];
            //console.log(`prior stat: ${formatDate(curDate)} ${state}[${statistic}] = ${priorStat}`)
            if (priorStat) resData[state][statistic] += priorStat;
        }
    }
    return resData;
}

/* format date to YYYYMMDD (as data passed to USGraph is keyed by YYYYMMDD strings) */
function formatDate(date) {
    return moment(date).format("YYYYMMDD");
}
/* format number to string, adding comma's rounding to max of 2 decimal places for tooltip display */
function formatNumber(n) {
    return Number(n.toFixed(n % 1 === 0 ? 0 : 2)).toLocaleString();
}

/**
 * Strip the 'Increasing' modifier from the passed statistic
 *  A necessary evil to handle statistic not-available checks when API
 *  incorrectly reports hospitalizedIncreased as 0 for states with no
 *  hospitalized data available (meaning Increased should be null)
 */
function stripInc(statistic) {
    return statistic.replace("Increase", "");
}

/**
 * Determine the correct tooltip based on data availability
 */
function selectTooltip(hasData, hasStat, normalizedStat) {
    if (!hasData) return `No data available`;
    else if (!hasStat) return `Selected statistic not reported`;
    else return formatNumber(normalizedStat);
}

/**
 * determine if Graphs are equivalent and should not be re-rendered
 *  (essentially so that we don't re-render whenever tool-tip changes)
 */
function areEqual(prevProps, nextProps) {
    //console.log('areEqual?');
    const p = prevProps.state,
        n = nextProps.state;
    return compareByProps(p, n, [
        "data",
        "radioSelected",
        "mode",
        "per_capita",
        "date",
    ]);
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

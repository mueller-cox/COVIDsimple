import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    AreaChart,
    BarChart,
    Bar,
    ReferenceLine,
    Brush,
    /*RadialBar,
    style,
    RadialBarChart*/
} from 'recharts';


import covid from '../images/covid19.png';
import colors from '../colors/colors';

const Graph = (props) => {

    /* dynamically resize graph on window resize */
    const [graphDimensions, setGraphDimensions] = useState({
        height: Math.floor(window.innerHeight * getHeightFactor()),
        width: Math.floor(window.innerWidth * getWidthFactor())
    });

    function handleResize() {
        setGraphDimensions({
            height: Math.floor(window.innerHeight * getHeightFactor()),
            width: Math.floor(window.innerWidth * getWidthFactor())
        });
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return _ => { window.removeEventListener('resize', handleResize) }
    })

    // Component gets passed 'data' as prop when Graph is rendered
    const { data } = props;
    //console.log('rendering graph', data)

    if (!data) {
        return <div>Missing Data!</div>;
    }

    // Unpack passed data
    const { payload, stateList, radioSelected } = data;
    //console.log("payload", payload)

    // Format payload to fit recharts graph requirements
    const finalPayload = convertDataset(payload, radioSelected)
    //console.log("FINAL PAYLOAD", finalPayload)

    if (payload.length === 0) {
        return (
            <div className='container'>
                <img className="covid-image graph-page" src={covid} alt="COVID-19" />
                <div className="overlay">
                    <div className="info"> Use the adjacent menu to graph data</div>
                </div>
            </div>
        );
    }
    else if (data.graph === 'g1') {
        return (
            <LineChart
                height={graphDimensions.height}
                width={graphDimensions.width}
                data={finalPayload}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                {stateList.map((state, i) => { /* We need one line for each state in data */
                    return (
                        <Line
                            key={state}
                            type="monotone"
                            dataKey={state}    /* each line contains all data for the given state */
                            stroke={colors[i]} /* lookup color from color palette  */
                            strokeWidth={1}
                            activeDot={{ r: 5 }}
                        />
                    );
                })}
            </LineChart>
        );
    } else if (data.graph === 'g2') {
        return (
            <AreaChart
                height={graphDimensions.height}
                width={graphDimensions.width}
                data={finalPayload}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {stateList.map((state, i) => { /* We need one line for each state in data */
                    return (
                        <Area
                            key={state}
                            type="monotone"
                            dataKey={state}    /* each line contains all data for the given state */
                            stroke={colors[i]} /* lookup color from color palette  */
                            strokeWidth={1}
                            activeDot={{ r: 5 }}
                            fill={colors[i]}
                        />
                    );
                })}
            </AreaChart>
        );
    } else if (data.graph === 'g3') {
        return (
            <BarChart
                height={graphDimensions.height}
                width={graphDimensions.width}
                data={finalPayload}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {stateList.map((state, i) => { /* We need one line for each state in data */
                    return (
                        <Bar
                            key={state}
                            type="monotone"
                            dataKey={state}    /* each line contains all data for the given state */
                            fill={colors[i]}
                        />
                    );
                })}
            </BarChart>
        );
    } else if (data.graph === 'g4') {
        return (
            <BarChart
                height={graphDimensions.height}
                width={graphDimensions.width}
                data={finalPayload}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                < CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke='#000' />
                <Brush dataKey='date' height={30} stroke="#8884d8" />
                {stateList.map((state, i) => { /* We need one line for each state in data */
                    return (
                        <Bar
                            key={state}
                            type="monotone"
                            dataKey={state}    /* each line contains all data for the given state */
                            fill={colors[i]}
                        />
                    );
                })}
            </BarChart >
        );
    }
}


/**
 * Format dataset into an array:
 * [
 *    {date: d0, state0: state0_d0_stat, state1: state1_d0_stat, ... stateN: stateN_d0_stat},
 *    {date: d1, state0: state0_d1_stat, state1: state1_d1_stat, ... stateN: stateN_d1_stat},
 *    ...
 *    {date: dN, state0: state0_dN_stat, state1: state1_dN_stat, ... stateN: stateN_dN_stat},
 * ]
 * 
 * Each array entry is an object with a date property, and properties for every state selected. 
 * Values of state properties are dictated by the recorded statistic for that state, on that date
 */
function convertDataset(data, statistic) {

    let dateKeyedMap = {};
    data.forEach(entry => {
        /* Group entries by date */
        if (!dateKeyedMap[entry.date]) {
            dateKeyedMap[entry.date] = { date: entry.date }
        }
        /* Add state statistics as properties */
        dateKeyedMap[entry.date][entry.state] = entry[statistic];
    });

    const sortedData = Object.values(dateKeyedMap).sort((a, b) => {
        return a.date < b.date ? -1 : (a.date === b.date ? 0 : 1);
    });
    return sortedData;

}

/** 
 * return the scale factors used to determine graph dimensions responsively.
 *      Appropriate factors are determined with refernce to hosting 
 *      Col's dimensions in the parent, state-view component (aka evil magic numbers)
 * */
function getWidthFactor() {
    let width = window.innerWidth;
    if (width < 768) {       /* bootstap xs, sm */
        return 11.5 / 12;
    }
    else if (width < 1200) { /* bootstrap md, lg */
        return 8.5 / 12;
    }
    else {                   /* bootstrap xl */
        return 9.5 / 12;
    }
}
function getHeightFactor() {
    let width = window.innerWidth;
    if (width < 768) { /* bootstrap xs, sm */
        return 0.5;
    }
    else { return 0.8; }
}

/** 
 * Controls whether memoized graph re-renders:
 * (functional equivalent of shouldComponent(not)Update lifecycle method)
 *     if the graph does not have a new payload, don't render
 */
function graphsEqual(prevProps, nextProps) {
    // console.log('should graph render?')
    const p = prevProps.data, n = nextProps.data;
    return compareByProps(p, n, ['payload']);
}

function compareByProps(obj1, obj2, proplist) {
    for (const prop of proplist) {
        if (obj1[prop] !== obj2[prop]) return false;
    }
    return true;
}

// export a memoized Graph to control re-rendering
export default React.memo(Graph, graphsEqual)

// Less efficient convertion 
// Change statistic key into state name
function StateToStatistic(data, stat) {
    let newDataSet = data.map(e => {
        let obj = {}
        // obj["state"] = e.state
        obj["date"] = e.date

        if (stat === 'positive') {
            obj[e.state] = e.positive
        } else if (stat === 'death') {
            obj[e.state] = e.death
        } else if (stat === 'hospitalized') {
            obj[e.state] = e.hospitalized
        } else {
            obj[e.state] = e.positiveIncrease
        }
        return obj
    })
    return newDataSet
}

// Add state statistics with same date together
function convertDatasetTwo(data, statistic) {
    let compressed = [];
    let newPayl = [];
    let n = 0;
    let j = 0;

    // Iterate over each object to change data key
    for (let i = 0; i < data.length; ++i) {
        newPayl.push(StateToStatistic(data[i], statistic))
    }
    // console.log('newPayl after stateToStat', newPayl)

    n = newPayl.length;

    if (n === 1) {                                                  // case 0: Extra case with only one object
        return newPayl;
    }

    // Iterate over objects in dataset
    for (let i = 0; i < n; ++i) {
        if ((j += 1) < n) {
            if (i === 0 && (n === 2)) {                                // Case 1: with 2 objects only
                return compressed = combineObjs(newPayl[i], newPayl[j])
            } else if (i === 0 && (n > 2)) {                           // Case 2A: with more than 2 objects, starting point
                compressed = combineObjs(newPayl[i], newPayl[j])
            } else {                                                   // Case 2B: use temp to compare to previous merge
                compressed = combineObjs(compressed, newPayl[j])
            }
        }
    }
    return compressed                                              // Final compressed dataset ready to be graph
}

// Helper function to merge data
function combineObjs(objA, objB) {
    let combined = []
    objA.forEach(x => {
        objB.forEach(y => {
            if (x.date === y.date) {                                   // Check date, if match merge
                combined.push({ ...x, ...y })
            }
        })
    })
    return combined
}

import React, { useEffect, /*Image */ } from 'react';
import { Row, Col } from 'reactstrap';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
    BarChart,
    Bar,
} from 'recharts';


import covid from '../images/covid19.png';
import colors from '../colors/colors';

const Graph = (props) => {

    // toggle off isSubmitted flag when component mounts/updates
    useEffect(props.renderCallback);

    // gets passed 'data' as prop when Graph is rendered
    const { data } = props;
    console.log('rendering graph', data)

    if (!data) {
        return <div> Missing Data!</div>;
    }

    // Unpack passed data
    const { payload, stateList, radioSelected } = data;
    console.log("payload", payload)
    // Format payload to fit recharts graph requirements
    const finalPayload = convertDataset(payload, radioSelected)
    console.log("FINAL PAYLOAD", finalPayload)

    if (payload.length === 0) {
        return (
            <div className='container'>
                <img className="covid-image graph-page" src={covid} alt="COVID-19" />
                <div className="overlay">
                    <div className="info"> Use the menu to the right to graph data</div>
                </div>
            </div>
        );
    }
    else if (data.graph === 'g1') {
        return (
            <ResponsiveContainer width="100%" height='100%'>
                <LineChart
                    //width={1200} /* Need to replace with responsive values */
                    //height={700}
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
            </ResponsiveContainer>
        );
    } else if (data.graph === 'g2') {
        return (
            <ResponsiveContainer width="100%" height='100%'>
                <AreaChart
                    // width={1200}
                    // height={700}
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
            </ResponsiveContainer >
        );
    } else if (data.graph === 'g3') {
        return (
            <ResponsiveContainer width="100%" height='100%'>
                <BarChart
                    // width={1200}
                    // height={700}
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
            </ResponsiveContainer >
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

// // Change statistic key into state name
// function StateToStatistic(data, stat) {
//     let newDataSet = data.map(e => {
//         let obj = {}
//         // obj["state"] = e.state
//         obj["date"] = e.date

//         if (stat === 'positive') {
//             obj[e.state] = e.positive
//         } else if (stat === 'death') {
//             obj[e.state] = e.death
//         } else if (stat === 'hospitalized') {
//             obj[e.state] = e.hospitalized
//         } else {
//             obj[e.state] = e.positiveIncrease
//         }
//         return obj
//     })
//     return newDataSet
// }

// // Add state statistics with same date together
// function convertDataset(data, statistic) {
//     let compressed = [];
//     let newPayl = [];
//     let n = 0;
//     let j = 0;

//     // Iterate over each object to change data key
//     for (let i = 0; i < data.length; ++i) {
//         newPayl.push(StateToStatistic(data[i], statistic))
//     }
//     console.log('newPayl after stateToStat', newPayl)

//     n = newPayl.length;

//     if (n === 1) {                                                  // case 0: Extra case with only one object
//         return newPayl;
//     }

//     // Iterate over objects in dataset
//     for (let i = 0; i < n; ++i) {
//         if ((j += 1) < n) {
//             if (i === 0 && (n === 2)) {                                // Case 1: with 2 objects only
//                 return compressed = combineObjs(newPayl[i], newPayl[j])
//             } else if (i === 0 && (n > 2)) {                           // Case 2A: with more than 2 objects, starting point
//                 compressed = combineObjs(newPayl[i], newPayl[j])
//             } else {                                                   // Case 2B: use temp to compare to previous merge
//                 compressed = combineObjs(compressed, newPayl[j])
//             }
//         }
//     }
//     return compressed                                              // Final compressed dataset ready to be graph
// }

// // Helper function to merge data
// function combineObjs(objA, objB) {
//     let combined = []
//     objA.forEach(x => {
//         objB.forEach(y => {
//             if (x.date === y.date) {                                   // Check date, if match merge
//                 combined.push({ ...x, ...y })
//             }
//         })
//     })
//     return combined
// }

/** Controls whether memoized graph re-renders:
 *  (functional equivalent of shouldComponent(not)Update lifecycle method)
 */
function graphsEqual(prevProps, nextProps) {
    // if the graph is not set to be submit, don't re-render
    //console.log('should graph render?')
    return !nextProps.data.isSubmitted
}

// export a memoized Graph to control re-rendering
export default React.memo(Graph, graphsEqual)
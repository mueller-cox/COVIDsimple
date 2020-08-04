import React, {useEffect, /*Image */} from 'react';
import { Row, Col } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import graph from '../images/graph.png';

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
      <div className="inital-load">
        <h4 className="state-view-intro"> Select information from the menu on the right to see a graph</h4>
        <img className="static-image" src={graph} alt="A sample graph from recharts"/>
      </div>
    );
  }
  else if (data.graph === 'g1') {
    return (
      // <div className="chart-wrapper">
      //   {isLoading ? 
      //   <div> loading...</div> :
      <Row className="simpleLineChart">
        <Col xs="12">
          <LineChart
            width={1200} /* Need to replace with responsive values */
            height={700}
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
            {stateList.map(state => { /* We need one line for each state in data */
              return (
                <Line key={state} type="monotone" dataKey={state} stroke="#8884d8" activeDot={{ r: 8 }} />
              );
            })}
          </LineChart>
        </Col>
      </Row>
      // }
      //     </div>
    );
  } else if (data.graph === 'g2') {
    return (

      <div> graph 2</div>
      // <AreaChart width={600} height={400} data={data}
      //   margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="name" />
      //   <YAxis />
      //   <Tooltip />
      //   <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
      //   <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
      //   <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
      // </AreaChart>

    );
  } else if (data.graph === 'g3') {
    // const getPath = (x, y, width, height) => {
    //   return `M${x},${y + height}
    //       C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
    //       C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
    //       Z`;
    // };

    // const TriangleBar = (props) => {
    //   const { fill, x, y, width, height } = props;

    //   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    // };

    // TriangleBar.propTypes = {
    //   fill: PropTypes.string,
    //   x: PropTypes.number,
    //   y: PropTypes.number,
    //   width: PropTypes.number,
    //   height: PropTypes.number,
    // };

    return (

      <div> add graph 3</div>
      // <BarChart width={600} height={300} data={data}
      //   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      //   <XAxis dataKey="name" />
      //   <YAxis />
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
      //     {
      //       data.map((entry, index) => (
      //         <Cell key={`cell-${index}`} fill={colors[index % 20]} />
      //       ))
      //     }
      //   </Bar>
      // </BarChart>
    );
  }
}

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
function convertDataset(data, statistic) {
  let compressed = [];
  let newPayl = [];
  let n = 0;
  let j = 0;

  // Iterate over each object to change data key
  for (let i = 0; i < data.length; ++i) {
    newPayl.push(StateToStatistic(data[i], statistic))
  }

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
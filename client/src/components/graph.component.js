import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = (props) => {

  // toggle off isSubmitted flag when component mounts/updates
  useEffect(props.renderCallback);

  // gets passed 'data' as prop when Graph is rendered
  const { data } = props;
  if (!data) {
    return <div> Missing Data!</div>;
  }

  if (data.graph === 'g1') {
    // Get the data
    const { payload } = data;
    console.log("payload", payload)

    // Format payload to fit graph requirements
    const finalPayload = convertDataset(payload)
    console.log("FINAL DATASET", finalPayload)

    return (
      <div> graph 1</div>
      // <Row className="simpleLineChart">
      //   <Col xs="12">
      //     <LineChart width={1200} height={700} data={finalPayload}
      //       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      //       <XAxis dataKey="name" />
      //       <CartesianGrid strokeDasharray="3 3" />
      //       <Tooltip />
      //       <Legend />
      //       <Line type="monotone" dataKey='AL' stroke="#8884d8" activeDot={{ r: 8 }} />
      //       <Line type="monotone" dataKey="AK" stroke="#82ca9d" />
      //       <Line type="monotone" dataKey="AZ" stroke="#82ca9d" />
      //     </LineChart>
      //   </Col>
      // </Row>
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
  } else {
    return (
      <h4> Select information from the menu on the right to see a graph</h4>
    )
  }
}

// Ugly but functional. Set state name as key to the statistic value
function StateToStatistic(x) {
  let newDataSet = x.map(e => {
    if (e.state === "AL") {
      return {
        "state": e.state,
        "date": e.date,
        "AL": e.positive,
      }
    }
    if (e.state === "AK") {
      return {
        "state": e.state,
        "date": e.date,
        "AK": e.positive,
      }
    }
    if (e.state === "AZ") {
      return {
        "state": e.state,
        "date": e.date,
        "AZ": e.positive,
      }
    }
    if (e.state === "AR") {
      return {
        "state": e.state,
        "date": e.date,
        "AR": e.positive,
      }
    }
    if (e.state === "CA") {
      return {
        "state": e.state,
        "date": e.date,
        "CA": e.positive,
      }
    }

    if (e.state === "CO") {
      return {
        "state": e.state,
        "date": e.date,
        "CO": e.positive,
      }
    }
    if (e.state === "CT") {
      return {
        "state": e.state,
        "date": e.date,
        "CT": e.positive,
      }
    }
    if (e.state === "DE") {
      return {
        "state": e.state,
        "date": e.date,
        "DE": e.positive,
      }
    }
    if (e.state === "DC") {
      return {
        "state": e.state,
        "date": e.date,
        "DC": e.positive,
      }
    }
    if (e.state === "FL") {
      return {
        "state": e.state,
        "date": e.date,
        "FL": e.positive,
      }
    }
    if (e.state === "GA") {
      return {
        "state": e.state,
        "date": e.date,
        "GA": e.positive,
      }
    }
    if (e.state === "HI") {
      return {
        "state": e.state,
        "date": e.date,
        "HI": e.positive,
      }
    }
    if (e.state === "ID") {
      return {
        "state": e.state,
        "date": e.date,
        "ID": e.positive,
      }
    }
    if (e.state === "IL") {
      return {
        "state": e.state,
        "date": e.date,
        "IL": e.positive,
      }
    }
    if (e.state === "IN") {
      return {
        "state": e.state,
        "date": e.date,
        "IN": e.positive,
      }
    }
    if (e.state === "IA") {
      return {
        "state": e.state,
        "date": e.date,
        "IA": e.positive,
      }
    }
    if (e.state === "KS") {
      return {
        "state": e.state,
        "date": e.date,
        "KS": e.positive,
      }
    }
    if (e.state === "KY") {
      return {
        "state": e.state,
        "date": e.date,
        "KY": e.positive,
      }
    }
    if (e.state === "LA") {
      return {
        "state": e.state,
        "date": e.date,
        "LA": e.positive,
      }
    }
    if (e.state === "ME") {
      return {
        "state": e.state,
        "date": e.date,
        "ME": e.positive,
      }
    }
    if (e.state === "MD") {
      return {
        "state": e.state,
        "date": e.date,
        "MD": e.positive,
      }
    }
    if (e.state === "MA") {
      return {
        "state": e.state,
        "date": e.date,
        "MA": e.positive,
      }
    }
    if (e.state === "MI") {
      return {
        "state": e.state,
        "date": e.date,
        "MI": e.positive,
      }
    }
    if (e.state === "MN") {
      return {
        "state": e.state,
        "date": e.date,
        "MN": e.positive,
      }
    }
    if (e.state === "MS") {
      return {
        "state": e.state,
        "date": e.date,
        "MS": e.positive,
      }
    }
    if (e.state === "MO") {
      return {
        "state": e.state,
        "date": e.date,
        "MO": e.positive,
      }
    }
    if (e.state === "MT") {
      return {
        "state": e.state,
        "date": e.date,
        "MT": e.positive,
      }
    }
    if (e.state === "NE") {
      return {
        "state": e.state,
        "date": e.date,
        "NE": e.positive,
      }
    }
    if (e.state === "NV") {
      return {
        "state": e.state,
        "date": e.date,
        "NV": e.positive,
      }
    }
    if (e.state === "NH") {
      return {
        "state": e.state,
        "date": e.date,
        "NH": e.positive,
      }
    }
    if (e.state === "NJ") {
      return {
        "state": e.state,
        "date": e.date,
        "NJ": e.positive,
      }
    }
    if (e.state === "NM") {
      return {
        "state": e.state,
        "date": e.date,
        "NM": e.positive,
      }
    }
    if (e.state === "NY") {
      return {
        "state": e.state,
        "date": e.date,
        "NY": e.positive,
      }
    }
    if (e.state === "NC") {
      return {
        "state": e.state,
        "date": e.date,
        "NC": e.positive,
      }
    }
    if (e.state === "ND") {
      return {
        "state": e.state,
        "date": e.date,
        "ND": e.positive,
      }
    }
    if (e.state === "OH") {
      return {
        "state": e.state,
        "date": e.date,
        "OH": e.positive,
      }
    }
    if (e.state === "OK") {
      return {
        "state": e.state,
        "date": e.date,
        "OK": e.positive,
      }
    }
    if (e.state === "OR") {
      return {
        "state": e.state,
        "date": e.date,
        "OR": e.positive,
      }
    }
    if (e.state === "PA") {
      return {
        "state": e.state,
        "date": e.date,
        "PA": e.positive,
      }
    }
    if (e.state === "RI") {
      return {
        "state": e.state,
        "date": e.date,
        "RI": e.positive,
      }
    }
    if (e.state === "SC") {
      return {
        "state": e.state,
        "date": e.date,
        "SC": e.positive,
      }
    }
    if (e.state === "SD") {
      return {
        "state": e.state,
        "date": e.date,
        "SD": e.positive,
      }
    }
    if (e.state === "TN") {
      return {
        "state": e.state,
        "date": e.date,
        "TN": e.positive,
      }
    }
    if (e.state === "TX") {
      return {
        "state": e.state,
        "date": e.date,
        "TX": e.positive,
      }
    }
    if (e.state === "UT") {
      return {
        "state": e.state,
        "date": e.date,
        "UT": e.positive,
      }
    }
    if (e.state === "VT") {
      return {
        "state": e.state,
        "date": e.date,
        "VT": e.positive,
      }
    }
    if (e.state === "VA") {
      return {
        "state": e.state,
        "date": e.date,
        "VA": e.positive,
      }
    }
    if (e.state === "WA") {
      return {
        "state": e.state,
        "date": e.date,
        "WA": e.positive,
      }
    }
    if (e.state === "WV") {
      return {
        "state": e.state,
        "date": e.date,
        "WV": e.positive,
      }
    }
    if (e.state === "WI") {
      return {
        "state": e.state,
        "date": e.date,
        "WI": e.positive,
      }
    }
  })
  return newDataSet
}

  function convertDataset(data) {
    let convertedData = [];
    let newPayl = [];
    let temp = [];
    let n = 0;
    let j = 0;

    // Iterate over each object to change data key
    for (let i = 0; i < data.length; ++i) {
      newPayl.push(StateToStatistic(data[i]))
    }

    n = newPayl.length;

    // Iterate over objects in dataset
    for (let i = 0; i < n; ++i) {
      if ((j += 1) < n) {
        if(i === 0 && (n === 2)){                                  // Use object 0 for first iteration with next one
          return temp = combineObjects(newPayl[i], newPayl[j])     // Combine objs with same key date
        } else if(i === 0 && (n > 2)) {                            // Start Combining when more than 2 objs 
          temp = combineObjects(newPayl[i], newPayl[j])            // Combine objs with same key date
        } else {                                                   // Use new stored dataset after first iterationn
          convertedData = combineObjects(temp, newPayl[j])
        }
      }
    }
    // console.log("CONVERTED DATA", convertedData)
    return convertedData                                          // Final combined dataset ready to be graph
  }

function combineObjects(objA, objB) {
  let combined = []
  objA.forEach(x => {
    objB.forEach(y => {
      if (x.date === y.date) {                                    // Check date, if match merge
        combined.push({ ...x, ...y })
      }
    })
  })
  // console.log("COMBINEDOBJ", combined)
  return combined
}

function graphsEqual(prevProps, nextProps) {
  // console.log('should graph render??')
  // console.log('prev submit:', prevProps.data.isSubmitted)
  // console.log('next submit:', nextProps.data.isSubmitted)

  // if the graph is not set to be submit, don't re-render
  return !nextProps.data.isSubmitted
}

export default React.memo(Graph, graphsEqual)
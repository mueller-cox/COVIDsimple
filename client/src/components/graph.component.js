import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = (props) => {

  // toggle off isSubmitted flag when component mounts/updates
  useEffect(props.renderCallback);
  
  // gets passed 'data' as prop when Graph is rendered
  const { data } = props;
  if (!data) return <div></div>;


  const y = [
    { name: 'Page A', uv: 4000, pv: 2400, xx: 4500, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, xx: 6500, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, xx: 7099, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, xx: 4400, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, xx: 2300, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, xx: 1200, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, xx: 2561, amt: 2100 },
  ];

  const { payload } = data;
<<<<<<< HEAD
  //console.log('RENDERING GRAPH...')
  //console.log(data);
=======
  console.log("payload", payload)
  console.log("data", data)


  // Iterate over each object to change data key
  const newData = []
  for (let i = 0; i < payload.length; ++i) {
    newData.push(StateToStatistic(payload[i]))
  }
  console.log("AFTER ADDED STATE", newData)

  // const finalData = combineObjects(newData)
  // console.log("final data", finalData)

  // if (data.graph === 'Simple Lines') {
>>>>>>> f306e8412d9724bcc2c4e85a088996d6722e4b80
  return (
    <Row className="simpleLineChart">
      <Col xs="12">
        <LineChart width={1200} height={700} data={y}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey='uv' stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          <Line type="monotone" dataKey="xx" stroke="#82ca9d" />
        </LineChart>
      </Col>
    </Row>
  );
}
// }

// function formatData(dataset) {
//   for (let i=0; i < dataset.length; ++i){
//     for (let j = 1; j < dataset.length; ++j) {

//   }
// }










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


// format the data to match the format required for recharts
function combineObjects(data) {
  const newData = []
  let o = null;
  // Compare objects of array
  for (let i = 0; i < data.length; ++i) {
    let curr = data[i]
    let next = data[i + 1]
    if (next != null) {
      //starting case without prev to which add to 
      if (i === 0) {
        // check for a matching date with the next object
        if (curr.date === next.date) {
          o = addTogether(curr, next)
          newData.push(o)
        } else {
          // if not match add next obj and start over
          newData.push(next)
        }
      } else {
        let prev = i - 1;
        if (prev != null) {
          if (newData[prev].date === next.date) {
            o = addTogether(newData[prev], next)
            newData.push(o)
          } else {
            newData.push(next)
          }
        }
      }
    }
  }
  //delete the last object since is a copy
  newData.pop();
  return newData
}


//performe an operation to add togheter objects
function addTogether(obj, src) {
  for (var key in src) {
    obj[key] = src[key];
  }
  return obj;
}



function graphsEqual(prevProps, nextProps) {
  // console.log('should graph render??')
  // console.log('prev submit:', prevProps.data.isSubmitted)
  // console.log('next submit:', nextProps.data.isSubmitted)
  
  // if the graph is not set to be submit, don't re-render
  return !nextProps.data.isSubmitted
}

export default React.memo(Graph, graphsEqual)
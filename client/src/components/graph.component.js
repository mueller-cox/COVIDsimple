import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

const Graph = (props) => {

  // toggle off isSubmitted flag when component mounts/updates
  useEffect(props.renderCallback);
  
  // gets passed 'data' as prop when Graph is rendered
  const { data } = props;
  if (!data) return <div></div>;

  const { payload } = data;
  //console.log('RENDERING GRAPH...')
  //console.log(data);
  return (
    <Row className="graph">
      <Col xs="12">
        {payload.map(function (stateList, i) {
          return (
              <Row key={`${i}`}>
              {stateList.map(function (entry, j) {
                  return (
                    <Col key={`${i}${j}`}>
                      {Object.keys(entry).map(function (key, k) {
                        return (
                          <Row key={`${i}${j}${k}`}>
                            <Col>
                              <p>{key}: {entry[key]}</p>
                            </Col>
                          </Row>
                        )
                      })}  
                    </Col>
                  );
              })}
              </Row>
          );
        })}
        </Col>
    </Row>
  );
}

function graphsEqual(prevProps, nextProps) {
  // console.log('should graph render??')
  // console.log('prev submit:', prevProps.data.isSubmitted)
  // console.log('next submit:', nextProps.data.isSubmitted)
  
  // if the graph is not set to be submit, don't re-render
  return !nextProps.data.isSubmitted
}

export default React.memo(Graph, graphsEqual)
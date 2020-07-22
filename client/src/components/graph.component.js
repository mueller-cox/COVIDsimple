import React from 'react';
import { Row, Col } from 'reactstrap';

const Graph = (props) => {
  // gets passed 'data'
  const { data } = props;
  if (!data) return <div></div>;

  const { payload } = data;
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

export default Graph;
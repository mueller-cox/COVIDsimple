import React from 'react';
import { Row, Col } from 'reactstrap';

const Graph = (props) => {
  // get passed 'data'
  const { data } = props;
  if (!data) return <div></div>;

  // unpack data
  const { payload } = data;
  return (
    <Row className="graph">
    <Col xs="12">
        <mark>This is a graph</mark>
        { console.log('graphing', payload) }
        {/*<p>{data.payload}</p>*/}
    </Col>
    </Row>
  );
};

export default Graph;
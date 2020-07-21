import React from 'react';
import { Row, Col } from 'reactstrap';

const Graph = (props) => {
  const { data } = props;
  if (!data) return <div></div>;

  return (
    <Row className="graph">
    <Col xs="12">
        <mark>This is a graph</mark>
        { console.log('graphing', data.payload) }
        {/*<p>{data.payload}</p>*/}
    </Col>
    </Row>
  );
};

export default Graph;
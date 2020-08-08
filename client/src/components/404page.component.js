
import React, { Component } from 'react';
import {
    Card,
    /*CardText,*/
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

// export const noMatch = (history) => {
export default class noMatch extends Component {
    render() {
        return (
            <Card className="noMatch-body">
                <CardBody className="noMatch-body">
                    <CardTitle className="noMatch-title">Error 404: page not found</CardTitle>
                    <CardSubtitle className="noMatch-subtitle">Please use the navbar above to redirect</CardSubtitle>
                    {/* <CardText className="noMatch-text">Clicking the link below will redirect you to the News Page</CardText> */}
                    {/* <p className="match-redirect">Redirecting to */}
                    {/* <spam onClick={() => history.push('/news')}> */}
                    {/* News Page */}
                    {/* </spam> */}
                    {/* </p> */}
                </CardBody>
            </Card>
        );
    }
}

// export default noMatch;

// const noMatch = (history) => {
//     return (
//         <div>
//             <h1>404 Page</h1>
//             <p>Redirecting to
//                 <spam onClick={() => history.push('/news')}>
//                     News Page
//                 </spam>
//             </p>
//         </div>
//     )
// }

// export default noMatch;
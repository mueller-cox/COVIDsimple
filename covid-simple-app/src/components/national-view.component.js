import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NationalView extends Component {
    constructor (props) {
        super(props);

        // we might have to us this.state = {} for each statistic
    }
    render() {
        return (
            <div>
                <p>NationalView</p>
            </div>  
        );
    }
}
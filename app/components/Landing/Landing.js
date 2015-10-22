import styles from './Landing.css';

import React, { Component } from 'react';

import HexLink from '../HexLink/HexLink';

export default class Landing extends Component {

    render () {
        return (
            <div>
                Login Form goes here
                <HexLink width="100px" to="/join-us" background="red">Join us.</HexLink>
            </div>
        );
    }
};

// This means session gets init only once on server side before delivering to client

import React, { Component } from 'react';

import * as SessionActions from '../actions/Session';

export default class Server extends Component {

    static required = [
        SessionActions.initSession
    ]

    render () {
        return this.props.children;
    }
};

// This means session gets init only once on server side before delivering to client

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import * as SessionActions from '../actions/Session';

@connect(
    state => ({ session: state.Session }),
    { pushState }
)
export default class Client extends Component {

    componentWillReceiveProps(nextProps) {
        if (!this.props.session.isLoggedIn && nextProps.session.isLoggedIn) {
            this.props.pushState(null, '/');
        }
        else if (this.props.session.isLoggedIn && !nextProps.session.isLoggedIn) {
            this.props.pushState(null, '/login');
        }
    }

    render () {
        return this.props.children;
    }
};

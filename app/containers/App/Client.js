// This means session gets init only once on server side before delivering to client

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';

@connect(
    state => ({ session: state.Session }),
    { pushState }
)
export default class Client extends Component {

    componentWillReceiveProps(nextProps) {
        if (!this.props.session.isLoggedIn && nextProps.session.isLoggedIn) {
            this.props.pushState(null, '/lobby');
        }
        else if (this.props.session.isLoggedIn && !nextProps.session.isLoggedIn) {
            this.props.pushState(null, '/');
        }
    }

    render () {
        return this.props.children;
    }
};

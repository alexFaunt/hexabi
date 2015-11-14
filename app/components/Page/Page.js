import styles from './Page.css';

import React, { Component } from 'react';

import Header from '../Header/Header';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import * as SessionActions from '../../actions/Session';

@connect(
    state => ({ session: state.Session }),
    { pushState }
)
export default class Page extends Component {

    // TODO - make a getSession thing, which gets the token from cookie
    // And validates it against server or something
    // Then on server render the token will be in the store
    // dont have to manually pt it in before the next set of requests
    // AFTER THAT DO THE TRANSITION MIDDLEWARE - TURNS OUT YOU DO NEED IT
    static required = [
        SessionActions.initSession
    ]

    static contextTypes = {
        history: React.PropTypes.object.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.session.isLoggedIn && nextProps.session.isLoggedIn) {
            this.props.history.pushState(null, '/');
        }
        else if (this.props.session.isLoggedIn && !nextProps.session.isLoggedIn) {
            this.props.history.pushState(null, '/login');
        }
    }

    render () {
        const { session, dispatch } = this.props;

        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
};

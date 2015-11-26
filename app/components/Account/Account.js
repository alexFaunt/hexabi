import styles from './Account.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as SessionActions from '../../actions/Session';

@connect(state => ({ session: state.Session }))
export default class Account extends Component {

    render () {
        const member = this.props.session.member;

        return (
            <div>
            { member }
            </div>
        );
    }
};

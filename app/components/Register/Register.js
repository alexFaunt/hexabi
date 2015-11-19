import styles from './Register.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegisterForm from '../RegisterForm/RegisterForm';

import * as SessionActions from '../../actions/Session';

@connect(state => ({ session: state.Session }))
export default class Register extends Component {

    render () {
        const { session, dispatch } = this.props;

        return (
            <RegisterForm session={session} {...bindActionCreators(SessionActions, dispatch)} />
        );
    }
};

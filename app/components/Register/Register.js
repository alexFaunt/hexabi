import styles from './Register.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegisterForm from '../RegisterForm/RegisterForm';

import * as UserActions from '../../actions/User';

@connect(state => ({ users: state.Users }))
export default class Register extends Component {

    render () {
        const { dispatch } = this.props;

        return (
            <div>
                Jooooin us.
                Im working on the sign up form...
                for now, just give me your name

                <RegisterForm {...bindActionCreators(UserActions, dispatch)} />
            </div>
        );
    }
};

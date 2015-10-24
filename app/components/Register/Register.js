import styles from './Register.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RegisterForm from '../RegisterForm/RegisterForm';

import * as MemberActions from '../../actions/Member';

@connect(state => ({ member: state.Member }))
export default class Register extends Component {
    render () {
        const { dispatch } = this.props;

        return (
            <div>
                <p>
                    Jooooin us.
                    Im working on the sign up form...
                    for now, just give me your name
                </p>

                <RegisterForm {...bindActionCreators(MemberActions, dispatch)} />
            </div>
        );
    }
};

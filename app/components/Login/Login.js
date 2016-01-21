import styles from './Login.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from '../LoginForm/LoginForm';

import * as SessionActions from '../../actions/SessionActions';

import Content from '../Content/Content';

@connect(state => ({ session: state.Session }))
export default class Login extends Component {

	render () {
		const { session, dispatch } = this.props;

		return (
			<Content>
				<LoginForm session={session}
					{...bindActionCreators(SessionActions, dispatch)} />
			</Content>
		);
	}
};

import styles from './LoginForm.css';

import React, { Component } from 'react';

export default class LoginForm extends Component {

	onSubmit = (e) => {
		e.preventDefault();

		this.props.login(username.value, password.value);
	}

	render () {
		return (
			<form onSubmit={ this.onSubmit } className={ styles.base }>
				<label htmlFor="username" className={ styles.row }>
					<span className={ styles.label }>Username:</span>
					<input type="text" className={ styles.input } placeholder="username" id="username" ref="username" />
				</label>
				<label htmlFor="password" className={ styles.row }>
					<span className={ styles.label }>Password:</span>
					<input type="text" className={ styles.input } placeholder="password" id="password" ref="password" />
				</label>
				<input type="submit" value="Submit" className={ styles.submit } />
			</form>
		);
	}
};

import styles from './LoginForm.css';

import React, { Component } from 'react';

export default class LoginForm extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        this.props.login(username.value, password.value);
    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="username">
                    <span>Username:</span>
                    <input type="text" placeholder="username" id="username" ref="username" />
                </label>
                <label htmlFor="password">
                    <span>Password:</span>
                    <input type="text" placeholder="password" id="password" ref="password" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
};

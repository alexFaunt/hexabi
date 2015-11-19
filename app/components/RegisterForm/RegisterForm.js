import styles from './RegisterForm.css';

import React, { Component } from 'react';

export default class RegisterForm extends Component {

    onSubmit = (e) => {
        e.preventDefault();

        this.props.register(username.value, password.value, member.value);
    }

    render () {
        return (
            <form onSubmit={ this.onSubmit }>
                <label htmlFor="username">
                    <span>Username:</span>
                    <input type="text" placeholder="username" id="username" ref="username" />
                </label>
                <label htmlFor="password">
                    <span>Password:</span>
                    <input type="text" placeholder="password" id="password" ref="password" />
                </label>
                <label htmlFor="member">
                    <span>Member:</span>
                    <input type="number" placeholder="member" id="member" ref="member" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
};

import styles from './Register.css';

import React, { Component } from 'react';

import HexLink from '../HexLink/HexLink';

export default class Register extends Component {

    onClick = (e) => {
        e.preventDefault();

        let node = this.refs['name'];

        this.props.createTodo(node.value);

    }

    render () {
        return (
            <div>
                Jooooin us.
                Im working on the sign up form...
                for now, just give me your name

                <input ref='name' type='text' placeholder='enter your name'/>

                <button type='submit' onClick={this.onClick}>GO!</button>
            </div>
        );
    }
};

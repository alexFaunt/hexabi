import React, { Component } from 'react';

export default class RegisterForm extends Component {
    handleSubmit = () => {
        let node = this.refs['name'];

        this.props.createMember({name: node.value});
    }

    render () {
        return (
            <div id='todo-form'>
                <input type='text' placeholder='enter your name' ref='name' />
                <input type='submit' value='OK!' onClick={this.handleSubmit} />
            </div>
        );
    }
}

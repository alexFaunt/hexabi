import React, { Component } from 'react';

export default class TodoForm extends Component {
    handleSubmit = () => {
        let node = this.refs['name'];

        this.props.createUser(node.value).then(function (args) {
            console.log(args);
        });
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
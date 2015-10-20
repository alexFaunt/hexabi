import React, { Component } from 'react';

export default class TodoView extends Component {

    componentDidMount () {
        // This is now done server side.
        // this.props.getTodos();
    }

    handleDelete = (e) => {
        const id = Number(e.target.dataset.id);

        // Equivalent to `dispatch(deleteTodo())`
        this.props.deleteTodo(id);
    }

    handleEdit = (e) => {
        const id  = Number(e.target.dataset.id);
        const val = this.props.todos.get(id).text

        // For cutting edge UX
        let newVal = window.prompt('', val);
        this.props.editTodo(id, newVal);
    }

    render () {
        const todoList = this.props.todos.map( (todo, index) => {
            return (
                <div key={index}>
                    <span>{todo}</span>
                    <button data-id={index} onClick={this.handleDelete}>
                        X
                    </button>
                    <button data-id={index} onClick={this.handleEdit}>
                        Edit
                    </button>
                </div>
            );
        })

        return (
            <div id="todo-list">
                {todoList}
            </div>
        );
    }
}

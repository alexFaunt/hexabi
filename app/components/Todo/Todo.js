import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TodoView from '../TodoView/TodoView';
import TodoForm from '../TodoForm/TodoForm';
import * as TodoActions from '../../actions/Todo';

@connect(state => ({ todos: state.Todo }))

export default class Todo extends Component {
    render() {
        const { todos, dispatch } = this.props;

        return (
            <div id="todo-list">
                <TodoView todos={todos}
                    {...bindActionCreators(TodoActions, dispatch)} />
                <TodoForm
                    {...bindActionCreators(TodoActions, dispatch)} />
            </div>
        );
    }
}

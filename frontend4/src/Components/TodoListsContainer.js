import { connect } from 'react-redux'
import React from 'react'
import { TodoListsWrapper }  from './TodoListsWrapper'
import { loadTodosThunkCreator } from '../reducers/todo-reducer'

class MiddleTodosComponent extends React.Component {
    componentDidMount() {
        this.props.loadTodosThunkCreator()
    }

    render() {
        return (
            <TodoListsWrapper {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    return { todoPage: state.todoPage }
}

// global state will turn into props and will be passed to MiddleNewsComponent
export const TodosContainer = connect(mapStateToProps, { loadTodosThunkCreator })(MiddleTodosComponent)
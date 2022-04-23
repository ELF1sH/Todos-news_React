import {todoApi} from '../Api/todoApi'

const LOAD_TODOS = "LOAD_TODOS"
const EDIT_TODO_ITEM = "EDIT_TODO_ITEM"
const SET_EDIT_TODO_ITEM = "SET_EDIT_TODO_ITEM"
const CLEAR_EDIT_FORM = "CLEAR_EDIT_FORM"

const initialState = {
    todos: [],
    editTodoItem: {
        name: "",
        priority: 0,
        description: "",
        isEdit: false
    },
    setEditTodoItem: {
        id: 0,
        listId: 0
    }
} 

const todoReducer = (state = initialState, action) => {
    // React-Redux works with links so we need to change state's memory link 
    // in order to explain to React-Redux that state has been changed
    let newState = { ...state } 

    switch(action.type) {
        case LOAD_TODOS:
            newState.todos = action.todos
            return newState
        case EDIT_TODO_ITEM:
            newState.todos = [...state.todos]
            newState.editTodoItem = {
                name: action.name, 
                priority: action.priority, 
                description: action.description, 
                isEdit: action.isEdit
            }
            return newState
        case SET_EDIT_TODO_ITEM:
            newState.todos = [...state.todos]
            newState.setEditTodoItem = {
                id: action.id,
                listId: action.listId
            }
            return newState
        case CLEAR_EDIT_FORM:
            newState.todos = [...state.todos]
            newState.editTodoItem.isEdit = false
            newState.editTodoItem.name = ""
            newState.editTodoItem.priority = 0
            newState.editTodoItem.description = ""
            return newState
        default:
            return newState
    }
}



export function editTodoItemActionCreator(name, priority, description, isEdit) {
    return { 
        type: EDIT_TODO_ITEM,  
        name: name,
        priority: priority,
        description: description,
        isEdit: isEdit
    }
}
export function setEditTodoItemActionCreator(id, listId) {
    return {
        type: SET_EDIT_TODO_ITEM,
        id: id, 
        listId: listId
    }
}
export function editTodoItemThunkCreator() {
    return (dispatch, getState) => {
        const state = getState().todoPage
        todoApi.editTodoItem(
            state.setEditTodoItem.id, 
            state.editTodoItem.name, 
            state.editTodoItem.description, 
            state.editTodoItem.priority, 
            state.setEditTodoItem.listId
        )
        .then(() => {
            todoApi.getTodos()
            .then(data => {
                dispatch(loadTodosActionCreator(data))
            })
        })
    }
}
export function clearEditFormActionCreator() {
    return {
        type: CLEAR_EDIT_FORM
    }
}



export function loadTodosActionCreator(todos) {
    return { type: LOAD_TODOS, todos: todos }
}
export function loadTodosThunkCreator() {
    return (dispatch) => {
        todoApi.getTodos()
        .then(data => {
            dispatch(loadTodosActionCreator(data))
        })
    }
}



export function createListThunkCreator(name) {
    return dispatch => {
        todoApi.createTodoList(name)
        .then(() => {
            todoApi.getTodos()
            .then(data => {
                dispatch(loadTodosActionCreator(data))
            })
        })
    }
}



export function deleteListThunkCreator(id) {
    return dispatch => {
        todoApi.deleteTodoList(id)
        .then(() => {
            todoApi.getTodos()
            .then(data => {
                dispatch(loadTodosActionCreator(data))
            })
        })
    }
}



export function createTodoItemThunkCreator(name, description, priority, listName) {
    return (dispatch, getState) => {
        const state = getState()
        let listId
        state.todoPage.todos.forEach(todoList => {
            if (todoList.name.toString() === listName.toString()) {
                listId = todoList.id
            }
        })
        todoApi.createTodoItem(name, description, priority, listId)
        .then(() => {
            todoApi.getTodos()
            .then(data => {
                dispatch(loadTodosActionCreator(data))
            })
        })
    }
}



export function deleteTodoItemThunkCreator(id) {
    return (dispatch, getState) => {
        const state = getState()
        todoApi.deleteTodoItem(state.todoPage.todos[0].ownerId, id)
        .then(() => {
            todoApi.getTodos()
            .then(data => {
                dispatch(loadTodosActionCreator(data))
            })
        })
    }
}



export function setAsDoneTodoItemThunkCreator(id) {
    return (dispatch, getState) => {
        const state = getState()
        todoApi.setAsDoneTodoItem(state.todoPage.todos[0].ownerId, id)
        .then(() => {
            todoApi.getTodos()
            .then(data => {
                dispatch(loadTodosActionCreator(data))
            })
        })
    }
}



export default todoReducer
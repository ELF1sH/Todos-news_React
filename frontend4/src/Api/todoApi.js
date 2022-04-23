import * as axios from 'axios'

const baseURL = 'https://sas.front.kreosoft.space/api/'

const instance = axios.create({
    baseURL: baseURL
})




function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)
}




function getTodos() {
    if (typeof getCookie("accessToken") === "undefined") {
        auth()
        .then(data => {
            setCookie("accessToken", data.accessToken)
        })
    }

    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.get('ToDoList')
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
        if (response.status === 401) {
            auth()
            .then(data => {
                setCookie("accessToken", data.accessToken)
                getTodos()
            })
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function editTodoItem(id, name, description, priority, listId) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.post('ToDoItem', {"id": id, "name": name, "description": description, "priority": priority, "listId": listId})
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
        if (response.status === 401) {
            auth()
            .then(data => {
                setCookie("accessToken", data.accessToken)
                editTodoItem()
            })
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function auth() {
    return instance.post('auth', {"username": "Rayson", "password": "Rayson1234"})
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function createTodoList(name) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.post('ToDoList', {name: name})
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function deleteTodoList(id) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.delete('ToDoList', {data: { id: id }})
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function createTodoItem(name, description, priority, listId) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.post('ToDoItem', {name: name, description: description, priority: priority, listId: listId})
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function deleteTodoItem(ownerId, id) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.delete('ToDoItem', {data: { ownerId: ownerId, id: id }})
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
    })
    .catch(error => {
        console.log(error)
    })
}

function setAsDoneTodoItem(ownerId, id) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + getCookie("accessToken")
    return instance.post('ToDoItem/check', { ownerId: ownerId, id: id })
    .then(response => {
        if (response.status === 200) {
            return response.data
        }
    })
    .catch(error => {
        console.log(error)
    })
}

export const todoApi = {
    auth: auth, 
    getTodos: getTodos,
    editTodoItem: editTodoItem,
    createTodoList: createTodoList,
    deleteTodoList: deleteTodoList,
    createTodoItem: createTodoItem,
    deleteTodoItem: deleteTodoItem,
    setAsDoneTodoItem: setAsDoneTodoItem
}
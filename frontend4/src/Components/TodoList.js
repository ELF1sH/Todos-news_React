import React from 'react'
import { Row, Button, ListGroup, Container } from 'react-bootstrap'
import { TodoItem } from './TodoItem'
import { deleteListThunkCreator } from '../reducers/todo-reducer'
import { useDispatch } from 'react-redux'

export function TodoList(props) {

    const dispatch = useDispatch()

    const deleteTodoListListener = () => {
        console.log(props.todo.id)
        dispatch(deleteListThunkCreator(props.todo.id))
    }

    return (
        <Container fluid className="px-0">
            <Row className="mx-1 mb-3">
                <h3 className="col font-weight-bold px-0 col-sm-9 col-8 todo-list-header">{props.todo.name}</h3>
                <div className="btn-wrapper col-sm-3 col-4 px-0 text-right">
                    <Button variant="danger" onClick={deleteTodoListListener}><i className="fas fa-trash-alt"></i> Удалить список</Button>
                </div>
            </Row>
            <ListGroup>
                {
                    props.todo.items.map(item => {
                        return (
                            <ListGroup.Item key={item.id}>
                                <TodoItem
                                    id={item.id}
                                    priority={item.priority}
                                    name={item.name}
                                    date={item.createDateTime}
                                    description={item.description}
                                    isDone={item.isDone}
                                    listId={props.todo.id}
                                />
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </Container>
    )
}
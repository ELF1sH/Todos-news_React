import React from 'react'
import { Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap'
import { 
    editTodoItemActionCreator, 
    setEditTodoItemActionCreator, 
    deleteTodoItemThunkCreator, 
    setAsDoneTodoItemThunkCreator } from '../reducers/todo-reducer'
import { useDispatch } from 'react-redux'

function getFormattedDate(datetime) {
    var date = new Date(datetime);
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return day + '.' + month + '.' + year;
}

const bgcSuccess = {
    backgroundColor: "#C3E6CB",
    width: "100%"
}


export function TodoItem(props) {

    const dispatch = useDispatch()

    const handleClickEdit = () => {
        dispatch(setEditTodoItemActionCreator(props.id, props.listId))
        dispatch(editTodoItemActionCreator(props.name, props.priority, props.description, true))
    }

    const handleClickDelete = () => {
        dispatch(deleteTodoItemThunkCreator(props.id))
    }

    const handleClickSetAsDone = () => {
        dispatch(setAsDoneTodoItemThunkCreator(props.id))
    }

    return (
        <div className="mx-0 d-flex" id="todo-item-wrapper">
            <Badge
                bg={props.priority === 2 ? "danger" : props.priority === 1 ? "warning" : "light"}
                className="rounded-0"
            > </Badge>
            <Row xs={1} md={2} className="p-2 m-0" style={props.isDone ? bgcSuccess : {width: "100%"}}>
                <Col md={9} className="pl-3 pr-0 mb-2 mb-md-0">
                    <Row className="mb-2">
                        <Col xs="auto" className="px-0 mr-3">
                            <h5 className="font-weight-bold mb-0 text-uppercase">{props.name}</h5>
                        </Col>
                        <Col xs="auto" className="px-0">
                            <h5 className="text-secondary font-weight-bold mb-0">{getFormattedDate(props.date)}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <p className="mb-0 px-0">{props.description}</p>
                    </Row>
                </Col>

                <Col md={3} className="pl-0 pr-3 d-flex justify-content-end align-items-center">
                    {
                        props.isDone ? (
                            <i className="fas fa-check text-success ml-auto" style={{fontSize: "42px"}}></i>
                        ) : (
                            <ButtonGroup aria-label="Basic example">
                                <Button variant="outline-success" onClick={handleClickSetAsDone}><i className="fas fa-check"></i></Button>
                                <Button variant="outline-warning" onClick={handleClickEdit}><i className="fas fa-pencil-alt"></i></Button>
                                <Button variant="outline-danger" onClick={handleClickDelete}><i className="fas fa-trash-alt"></i></Button>
                            </ButtonGroup>
                        )
                    }
                </Col>
            </Row>
        </div>
    )
}
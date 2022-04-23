import React, {useState, useRef} from "react"
import { Card, Form, Button, Row, Col, Overlay, Popover, Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { editTodoItemActionCreator, editTodoItemThunkCreator, clearEditFormActionCreator, createTodoItemThunkCreator } from "../reducers/todo-reducer"

const popoverIconStyles = {
    padding: "4px 8px",
    backgroundColor: "orange",
    color: "white"
}

export function FormTodoItemCreation() {

    const nameInputRef = useRef(null)
    const prioritySelectRef = useRef(null)
    const listSelectRef = useRef(null)
    const descriptTextareaRef = useRef(null)

    const [showPopover, setShowPopover] = useState(false)
    const [target, setTarget] = useState(nameInputRef)
    const [openCollapse, setOpenCollapse] = useState(false)

    // getting redux store using useSelector hook
    let reduxState = useSelector(state => state)
    console.log(reduxState)
    const dispatch = useDispatch()

    const onChange = () => {
        dispatch(editTodoItemActionCreator(
            nameInputRef.current.value, 
            +prioritySelectRef.current.value - 1, 
            descriptTextareaRef.current.value, 
            reduxState.todoPage.editTodoItem.isEdit
        ))
    }

    const clearBtnListener = () => {
        dispatch(clearEditFormActionCreator())
    }

    function createBtnListener() {
        if (nameInputRef.current.value === "") {
            setShowPopover(true)
            setTarget(nameInputRef)
            return
        }
        if (descriptTextareaRef.current.value === "") {
            setShowPopover(true)
            setTarget(descriptTextareaRef)
            return
        }
        if (reduxState.todoPage.editTodoItem.isEdit) {
            dispatch(editTodoItemThunkCreator())
            dispatch(clearEditFormActionCreator())
        }
        else {
            dispatch(createTodoItemThunkCreator(
                nameInputRef.current.value, 
                descriptTextareaRef.current.value, 
                +prioritySelectRef.current.value - 1,
                listSelectRef.current.value
            ))
            dispatch(clearEditFormActionCreator())
        }
    }

    function inputListener() {
        setShowPopover(false)
    }

    return (
        <Card className="mb-3">
            <Card.Header
                onClick={() => setOpenCollapse(!openCollapse)}
                aria-controls="form-collapse"
                aria-expanded={openCollapse}
                role="button"
            >
                <h6 className="text-uppercase">создать элемент todo</h6>
            </Card.Header>
            <Collapse in={openCollapse}>
                <div id="form-collapse">
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" ref={nameInputRef} onClick={inputListener} value={reduxState.todoPage.editTodoItem.name} onChange={onChange} />
                            <Overlay
                                show={showPopover}
                                target={target}
                                placement="bottom"
                            >
                                <Popover style={{ margin: 0 }}>
                                    <Popover.Body>
                                        <span className="fas fa-exclamation" style={popoverIconStyles}></span>&nbsp;
                                        Please fill out this field
                                    </Popover.Body>
                                </Popover>
                            </Overlay>
                        </Form.Group>
                        <Row className="mb-3">
                            <Col md>
                                <Form.Group>
                                    <Form.Label>Приоритет</Form.Label>
                                    <Form.Select ref={prioritySelectRef} value={reduxState.todoPage.editTodoItem.priority + 1} onChange={onChange} >
                                        <option value="1">Обычный</option>
                                        <option value="2">Важный</option>
                                        <option value="3">Критический</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group>
                                    <Form.Label>Список</Form.Label>
                                    <Form.Select ref={listSelectRef}>
                                        {
                                            reduxState.todoPage.todos.map((todoList, index) => {
                                                return (
                                                    <option value={reduxState.todoPage.todos.id} key={index}>{todoList.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                ref={descriptTextareaRef} 
                                onClick={inputListener} 
                                value={reduxState.todoPage.editTodoItem.description}
                                onChange={onChange}
                            ></Form.Control>
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="secondary" className="mr-1" onClick={clearBtnListener}>Очистить</Button>
                        <Button variant="success" onClick={createBtnListener}>Создать</Button>
                    </Card.Footer>
                </div>
            </Collapse>

        </Card>
    )
}
import React, { useState, useRef } from "react"
import { Card, Form, Button, Overlay, Popover, Collapse } from 'react-bootstrap'
import { useDispatch } from "react-redux"
import { createListThunkCreator } from "../reducers/todo-reducer"

const popoverIconStyles = {
    padding: "4px 8px",
    backgroundColor: "orange",
    color: "white"
}

export function FormTodoCreation(props) {

    const nameInputRef = useRef(null)

    const [showPopover, setShowPopover] = useState(false)
    const [openCollapse, setOpenCollapse] = useState(false)

    const dispatch = useDispatch()

    const clearBtnListener = () => {
        nameInputRef.current.value = ""
    }

    const createBtnListener = () => {
        if (nameInputRef.current.value === "") {
            setShowPopover(true)
            return
        }

        dispatch(createListThunkCreator(nameInputRef.current.value))
    }

    const inputListener = () => {
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
                <h6 className="text-uppercase">создать список todo</h6>
            </Card.Header>
            <Collapse in={openCollapse}>
                <div id="form-collapse">
                    <Card.Body>
                        <Form.Group>
                            <Form.Label>Название</Form.Label>
                            <Form.Control type="text" ref={nameInputRef} onClick={inputListener} />
                            <Overlay
                                show={showPopover}
                                target={nameInputRef}
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
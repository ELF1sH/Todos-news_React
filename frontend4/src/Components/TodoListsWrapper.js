import React from 'react'
import { Card, Tabs, Tab } from 'react-bootstrap'
import { TodoList } from './TodoList'

export class TodoListsWrapper extends React.Component {
    render() {
        console.log(this.props)
        return (
            <Card className="mb-3">
                <Card.Body>
                    <Tabs fill className="mb-3">
                        {
                            this.props.todoPage.todos.map(todo => {
                                return (
                                    <Tab key={todo.id} eventKey={"title-" + todo.id} title={todo.name}>
                                        <TodoList todo={todo} />
                                    </Tab>
                                )
                            })
                        }
                    </Tabs>
                </Card.Body>
            </Card>
        )
    }
}
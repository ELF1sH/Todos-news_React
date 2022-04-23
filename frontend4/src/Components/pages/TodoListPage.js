import React from "react"
import { Container } from 'react-bootstrap'
import { LegendPriority } from "../LegendPriority"
import { FormTodoCreation } from "../FormTodoCreation"
import { FormTodoItemCreation } from "../FormTodoItemCreation"
import { TodosContainer } from "../TodoListsContainer"

export class TodoListPage extends React.Component {
    render() {
        return (
            <Container fluid="xl" className="content-wrapper">
                <LegendPriority />
                <FormTodoCreation />
                <FormTodoItemCreation />
                <TodosContainer />
            </Container>
        )
    }
}
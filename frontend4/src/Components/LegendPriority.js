import React from "react"
import { Card, Badge } from 'react-bootstrap'

export class LegendPriority extends React.Component {
    render() {
        return (
            <Card className="p-2 mb-3">
                <p className="font-weight-bold">Приоритеты элементов ToDo:</p>
                <div className="badges-wrapper">
                    <Badge bg="light" text="dark" className="border border-dark text-uppercase p-2 mr-1">Обычный</Badge>
                    <Badge bg="warning" text="dark" className="border border-dark text-uppercase p-2 mr-1">Важный</Badge>
                    <Badge bg="danger" text="light" className="border border-dark text-uppercase p-2 mr-1">Критический</Badge>
                </div>
            </Card>
        )
    }
}
import React from 'react'
import { Container } from 'react-bootstrap'

export class Footer extends React.Component {
    render() {
        return (
            <Container fluid className="footer px-0 d-flex justify-content-center align-items-center">
                <p className="text-secondary mb-0">Sticky footer example</p>
            </Container>
        )
    }
}
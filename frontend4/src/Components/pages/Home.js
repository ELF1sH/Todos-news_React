import React from 'react'
import { Container, Carousel, Alert } from 'react-bootstrap'
import NewsContainer from '../NewsContainer'

export class Home extends React.Component {
    render() {
        return (
            <Container>
                <Carousel fade className="mb-3 content-wrapper">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://picsum.photos/id/237/1200/350"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://picsum.photos/id/242/1200/350"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://picsum.photos/id/239/1200/350"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>

                <h1 className="text-center">Новости</h1>
                <Alert variant={"info"} className="text-center">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, dolores.
                </Alert>
                
                <NewsContainer />
            </Container>
        )
    }
}
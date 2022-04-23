import React from 'react'
import { Card, Row } from 'react-bootstrap'

export class NewsItem extends React.Component {

    getFormattedDate(datetime) {
        var date = new Date(datetime);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return day + '.' + month + '.' + year;
    }

    render() {
        return (
            <Card className="mb-3">
                <Card.Header>
                    <Row>
                        <h5 className="mb-0 col-7 pr-0 news-title">{this.props.title}</h5>
                        <p className="mb-0 col-5 pl-0 text-secondary text-right">{this.props.tags}</p>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{this.props.content}</Card.Text>
                    <img src={this.props.imageSrc} alt="news-img" className="img-fluid"/>
                </Card.Body>
                <Card.Footer>
                    <Row style={{color: "black"}}>
                        <p className="col mb-0 pr-0">
                            <span className="font-weight-bold">Date: </span>
                            <span className="news-date">{this.getFormattedDate(this.props.date)}</span>
                        </p>
                        <p className="col mb-0 pl-0 text-right">
                            <span className="font-italic news-likes">{this.props.likes} </span>
                            <i className="fas fa-heart like-btn" role="button" onClick={() => this.props.setLike(this.props.id)}></i>
                        </p>
                    </Row>
                </Card.Footer>
            </Card>
        )
    }
}
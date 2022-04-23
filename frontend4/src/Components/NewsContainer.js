import { connect } from 'react-redux'
import React from 'react'
import { News }  from './News'
import { loadNewsThunkCreator, setLikeThunkCreator } from '../reducers/news-reducer'

class MiddleNewsComponent extends React.Component {
    componentDidMount() {
        this.props.loadNewsThunkCreator()
        console.log(this.props)
    }

    render() {
        return (
            <News {...this.props} />
        )
    }
}

function mapStateToProps(state) {
    return { newsPage: state.newsPage }
}

// global state will turn into props and will be passed to MiddleNewsComponent
const NewsContainer = connect(mapStateToProps, { loadNewsThunkCreator, setLikeThunkCreator })(MiddleNewsComponent)

export default NewsContainer
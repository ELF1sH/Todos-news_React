import {newsApi} from '../Api/newsApi'

const LOAD_NEWS = "LOAD_NEWS"

const initialState = {
    news: []
}

const newsReducer = (state = initialState, action) => {
    // React-Redux works with links so we need to change state's memory link 
    // in order to explain to React-Redux that state has been changed
    let newState = { ...state } 

    switch(action.type) {
        case LOAD_NEWS:
            newState.news = action.news
            return newState
        default:
            return newState
    }
}



export function loadNewsActionCreator(news) {
    return { type: LOAD_NEWS, news: news }
}

export function loadNewsThunkCreator() {
    return (dispatch) => {
        newsApi.getNews().then(data => {
            dispatch(loadNewsActionCreator(data))
        })
    }
}



export function setLikeThunkCreator(id) {
    return dispatch => {
        newsApi.setLike(id)
        .then(() => {
            newsApi.getNews()
            .then(data => {
                dispatch(loadNewsActionCreator(data))
            })
        })
        
    }
}



export default newsReducer
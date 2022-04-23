import React from "react";
import { NewsItem } from './NewsItem.js'

import imageSrc1 from "../images/news-image-1.jpg"
import imageSrc2 from "../images/news-image-2.jpg"
import imageSrc3 from "../images/news-image-3.jpg"
import imageSrc4 from "../images/news-image-4.jpg"
const imageSrc = [
    imageSrc1, imageSrc2, imageSrc3, imageSrc4
]

export class News extends React.Component { 
    render() {
        return (
            <div>
                {
                    this.props.newsPage.news.map((value, index) => {
                        return (
                            <NewsItem 
                                title={value.title} 
                                content={value.content} 
                                date={value.date} 
                                likes={value.serviceInfo.likes} 
                                key={value.id} 
                                imageSrc={imageSrc[index]} 
                                id={value.id}
                                setLike={this.props.setLikeThunkCreator}
                            />
                        )
                    })
                }
            </div>
        )
    }
} 
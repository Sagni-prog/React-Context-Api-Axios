import React from 'react'
import './article.css'
import Catagory from '../Catagory/Catagory'
import Post from '../Post/Post'



const Article = () => {
  return (
    <main>
       <div className="article_container article_wrapper">
            <Post />
            <Catagory /> 
         </div>
    </main>
  )
}

export default Article
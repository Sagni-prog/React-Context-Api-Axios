import React,{useContext,useEffect,useState} from 'react'
import {MdComment} from 'react-icons/md'
import {FaThumbsUp} from 'react-icons/fa'
import {FaRegThumbsUp} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import ArticleContext from '../../Contexts/ArticleContext';
import CatagoryContext from '../../Contexts/CatagoryContext'
import { useNavigate } from 'react-router-dom';
import Data from '../../Constants/Data'
import CommentForm from '../Comment/CommentForm'
// import http from '../../Api/Url'
import axios from 'axios';

  const token = localStorage.getItem('token');

  const http = axios.create({
    'baseURL': 'http://127.0.0.1:8000/api',
    'headers': {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  });

const Post = () => {

   const redirect = useNavigate();
   const [current,setCurrent] = useState();
   const [visible,setVisible] = useState(false);
   const {state,dispatch} = useContext(ArticleContext);
   const {authenticate,dispatchauth} = useContext(CatagoryContext);

   useEffect(()=> {
     console.log(state)
   })

   async function handleLike(post){
      if(localStorage.getItem('user') &&
         localStorage.getItem('token')){
          sendLike(post);
   }
   else{
       redirect('/login');
    }
     
   }

   async function sendLike(post,index){

    if(post.likes.length){
          const data = {id: post.id}
          const user_id = JSON.parse(localStorage.getItem('user')).id;
          const likes = await http.post('/posts/like',data);
          dispatch({type: 'LIKE',index,post,user_id,});
          console.log(likes)
       }
       else{
            const data = {id: post.id}
            const user_id = JSON.parse(localStorage.getItem('user')).id;
            const likes = await http.post('/posts/like',data);
            dispatch({type: 'DISLIKE',index,post,user_id,});
            console.log(likes)
       }
   }

   function handleRedirect(){
      // redirect(`/post/1`)
   }

   function handleToggle(post,index){
      setCurrent(index)
      setVisible(!visible)
  }

 function getCommentsCount(comment){
   return comment.length;
    
 }
 function getLikesCount(likes){
   return likes.length;
    
 }

 
  return (
    <div className="post">
    <div className="post_header">
        <p>Articles</p>
    </div>
    <div className="post_body">
        <div className="post_wrapper body_container">

     {
       state.map((post,index) => {
         return(
                <div key={index} className="test">
                <div className="post_title">
                  <Link to = '#' onClick={handleRedirect(post)}>{post.title}</Link>
                </div>
                <div className="post_text">
                    <p className="catagory">
                        <span>Catagory: {post.catagory.catagory_name}</span>
                      </p>
                      <div className="limit">
                    <p>{post.body}</p>
                  </div>
                    <div className="icons">
                      <span>
                        <MdComment className='activated' onClick={()=> handleToggle(post,index)}/>
                        <p>{getCommentsCount(post.comments)}</p>  
                    </span>
                      <span>
                      <FaThumbsUp className='activated' onClick={() => handleLike(post,index)}/> 
                        <p>{getLikesCount(post.likes)}</p>  
                    </span>
                </div>
                {
                   current === index && visible &&
                   <CommentForm post = {post} index = {index} />
                }
              
            </div>
        </div>
         )
       })
     }
        


       
      </div>
   </div>
</div>
  )
}

export default Post
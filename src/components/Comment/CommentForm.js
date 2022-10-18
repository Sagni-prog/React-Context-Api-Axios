import React,{useContext, useState} from 'react'
import Data from '../../Constants/Data'
import './commentForm.css'
import axios from 'axios';
import ArticleContext from '../../Contexts/ArticleContext';
import { useNavigate } from 'react-router-dom';
// import http from '../../Api/Url';

const token = localStorage.getItem('token');

const http = axios.create({
  'baseURL': 'http://127.0.0.1:8000/api',
  'headers': {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
   },
});

 const CommentForm = (props) => {
   
      const redirect = useNavigate();
      const {state,dispatch} = useContext(ArticleContext);
      const [comment,setComment] = useState('');
      const post = props.post;
      const index = props.index;

    async function sendComment(){

         const data = {id: post.id,comment: comment}
         const result = await http.post('/posts/comment',data);
         const user_id = JSON.parse(localStorage.getItem('user')).id;
           dispatch({type: 'COMMENT',index,post,user_id,comment});
           setComment('');
     }

     function handleSubmit(e){
       e.preventDefault();
       if(localStorage.getItem('user') &&
       localStorage.getItem('token')){
         
         sendComment();
       }
       else{
           redirect('/login');
        }
     }
     
  return (
      <div className="profile_wrap">
        <div className="comment_profile">
            <img src = {Data[0].image} />
        </div>

      <form method="post" className='comment_form' action="" onSubmit={handleSubmit}>
          <textarea name="body" id="" cols="30" value={comment} rows="5" placeholder="Comment here" onChange={e => setComment(e.target.value) }></textarea>
            <button type="submit" className="comment_btn">Send</button>
      </form>
   </div>
  )
}

export default CommentForm
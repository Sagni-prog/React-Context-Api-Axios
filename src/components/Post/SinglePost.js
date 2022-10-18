import React,{useEffect}from 'react'
import './singlePost.css'
import {MdComment} from 'react-icons/md'
import {FaThumbsUp} from 'react-icons/fa'
import {FaRegThumbsUp} from 'react-icons/fa'
import Data from '../../Constants/Data';
import CommentForm from '../Comment/CommentForm';


const SinglePost = () => {

    
  return (

            <div className="single_container single_wrapper">
                <div className="single_post">
                    <div className="single_post_header">
                        <div className="user_profile">
                            <div className="profile">
                               <img src = {Data[0].image} />
                            </div>
                        <p className="text_capital">Mike</p>
                   </div>
              </div>
                 <div className="single_post_body">
                   <div className="single_post_wrapper body_container"> 
                      <div className="single_test">
                        <div className="single_post_title">
                           <p className="text_capital">Teck</p>
                        </div>
                    <div className="single_post_text">
                       <p className="catagory">
                          <span className="text_capital">Catagory :New Technologies</span>
                        </p>
                  <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur illum quisquam porro a deserunt commodi officiis inventore,
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur illum quisquam porro a deserunt commodi officiis inventore,
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur illum quisquam porro a deserunt commodi officiis inventore,
                </p>

                <div className="icons">
                    <span>
                      <MdComment className='activated' />
                     <p>10</p>  
                  </span>
                    <span>
                    <FaRegThumbsUp className='activated'/> 
                     <p>10</p>  
                  </span>
             </div>

             <CommentForm />

                    {/* <div className="profile_wrap">
                        <div className="profile">
                          <img src = {Data[0].image} />
                        </div>

               <form method="post" className='comment_form' action="">
                  
                   <textarea name="body" id="" cols="30" rows="5" placeholder="Comment here"></textarea>
                            <button type="submit" className="comment_btn">Send</button>
                        </form>
                    </div> */}

                    <div className="comment">
                        <div className="author">
                            <img src = {Data[0].image} />
                        </div>
                        <div className="comment_body">
                            <div className="comment_wrapper">
                                <p className="comment_auther_name">
                                   Poul Popsin
                                </p>
                                <p className="comment_text" >
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur illum quisquam porro a deserunt commodi officiis inventore,
                                       <span className="read_more">
                                           ....Read More
                                       </span>
                                    </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
         </div>
     </div>
    </div>
    </div>


  )
}

export default SinglePost

import React,{useState,useContext} from 'react';
import axios from 'axios';
import {MdEmail} from 'react-icons/md';
import {MdLock} from 'react-icons/md';
import { Link,useNavigate } from 'react-router-dom';
import http from '../../Api/Url';
import Data from '../../Constants/Data';
import CatagoryContext from '../../Contexts/CatagoryContext';


export const Login = () => {

    const { authenticate,dispatchauth,auth } = useContext(CatagoryContext)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
   

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const sendData = async(data) => {
        const res = await http.post("/user/login",data);
        dispatchauth({type: 'LOG'})
         navigate("/");
        const token = res.data.token;
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(res.data.user));
        
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        let data = {email: email,password: password}
         
        sendData(data)
    }

  return (
    <div className='container'>
      <div className='title'>
        <img src = { Data[0].image } alt = {Data[0].alt}/>
            <h1>Sign In</h1>
        </div>

        <div className='field_container'>
            <div className='inner_field'>
                
                <form onSubmit={handleSubmit} className = 'login_form'>
                    <div className='input_field'>

                        <div className='wrapper'>
                            <input type='text' value = {email} onChange = {handleEmailChange} placeholder = "Email" />
                            <div className='icon bg_green'>
                                <MdEmail className='item' />
                            </div>
                        </div>

                        <div className='wrapper'>
                           <input type='password' value={password} onChange = {handlePasswordChange} placeholder = "Password"/>   
                           <div className='icon bg_yellow'>
                                <MdLock className='item' />
                            </div> 
                        </div>
                    </div>
                    <div className='action'>

                        <Link to='/register'>Register</Link>
                        <button className='button'>Sign In</button>
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

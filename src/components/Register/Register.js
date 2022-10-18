import React, {useEffect, useState,useContext} from 'react';
import {MdEmail} from 'react-icons/md';
import {MdLock} from 'react-icons/md';
import {MdPerson} from 'react-icons/md';
import {MdFileUpload} from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';
import http from '../../Api/Url';
import Data from '../../Constants/Data';
import './register.css';
import CatagoryContext from '../../Contexts/CatagoryContext';


export const Register = () => {

   const [authenticate,dispatchauth] = useContext(CatagoryContext)
 
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmpas,setConfirmPas] = useState('');
    const [photo,setPhoto] = useState('');
    const [error,setError] = useState(false);



    const handleNameChange = (e) => {
        setName(e.target.value);
    }
   
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasChange = (e) => {
        setConfirmPas(e.target.value);
    }
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    }

     async function sendData(formData){
        const res = await http.post("/user/register",formData);
        localStorage.setItem('token',JSON.stringify(res.data.token));
        localStorage.setItem('user',JSON.stringify(res.data.user));
        dispatchauth({type: 'LOG'})
        
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPas('');
        setPhoto(null);
    }

    const confirmPassword = () => {
        if(password === confirmpas){
            return true;
        }
        else{
            return false;
        }
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        if(confirmPassword()){

            const formData = new FormData();
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('photo',photo)
        
         sendData(formData);
        }
        else{
            setError(true);
        }
     }

  return (
    <div className='container'>
     <div className='title'>
        <img src = { Data.image } alt = {Data.alt}/>
        <h1>Sign Up</h1>
    </div>
    <div className='field_container'>
        <div className='inner_field'>
            <form onSubmit={handleSubmit} className = "register_form">
                <div className='input_field'>
                    <div className='wrapper'>
                        <input type='text' value={name} onChange = { handleNameChange } placeholder='Name'/>
                        <div className='icon bg_green'>
                            <MdPerson className='item' />
                        </div>
                    </div>

                    <div className='wrapper'>
                        <input type='text' value={email} onChange = {handleEmailChange} placeholder='Email'/>
                        <div className='icon bg_green'>
                            <MdEmail className='item' />
                        </div>
                    </div>
                    <div className='wrapper'>
                       <input type='password' value={password} onChange = {handlePasswordChange} placeholder='Password'/>   
                       <div className='icon bg_yellow'>
                            <MdLock className='item' />
                        </div> 
                    </div>

                    <div className='wrapper'>
                       <input type='password' value={confirmpas} onChange = {handleConfirmPasChange} placeholder='Confirm Password'/>   
                       <div className='icon bg_yellow'>
                            <MdLock className='item' />
                        </div> 
                    </div>

                    <div className='wrapper'>
                       <input type='file' onChange = {handlePhotoChange} placeholder='Photo'/>   
                       <div className='icon bg_yellow'>
                            <MdFileUpload className='item' />
                        </div> 
                    </div>
                </div>
                <div className='action'>
                    <Link to = '/login'>Login</Link>
                    <button className='button'>Sign Up</button>
                </div>
            </form>

        </div>
    </div>
 </div>
  )
}

import { useEffect,useReducer,useState } from 'react';
import './App.css';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import Article from './components/Article/Article';
import SinglePost from './components/Post/SinglePost';
import Protected from './components/Protected/Protected';
import ArticleContext from './Contexts/ArticleContext';
import AuthContext from './Contexts/AuthContext';
import CatagoryContext from './Contexts/CatagoryContext';
import ArticleReducer from './Reducers/ArticleRecucer';
import AuthReducer from './Reducers/AuthReducer';
import CatagoryReducer from './Reducers/CatagoryReducer';
import Data from './Constants/Data';
import axios, { AxiosError } from 'axios';
import {
          BrowserRouter,
          Routes,
          Route,
          useNavigate,
   } from 'react-router-dom'

const token = localStorage.getItem('token');

const http = axios.create({
  'baseURL': 'http://127.0.0.1:8000/api',
  'headers': {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`,
   },
});


function App() {
  
   const [auth,setAuth] = useState(false);
   const [isLoading,setIsloading] = useState(true);
   const [state,dispatch] = useReducer(ArticleReducer,[]);
   const [catagory,dispatchCatagory] = useReducer(CatagoryReducer,[]);
   const [authenticate,dispatchauth] = useReducer(AuthReducer,{auth: auth});

  useEffect( () => {
        getUser(); 
        getCatagory();
        console.log()       
  },[]);

  useEffect(() => {
   if(localStorage.getItem('token')){
      setAuth(true)
      dispatchauth({type: 'LOGIN',auth})
   }
  }, [auth])
  

   
 
  const getUser = async() => {
     const post = await http.get('/posts');
     dispatch({type: 'GET',post});
     setIsloading(false);
  }

  async function getCatagory(){
     const data = await http.get('/catagories');
     dispatchCatagory({type: 'GET',data})

  }
       
  return (
     
        
     
    <div>
       <div className={`${isLoading ? 'preloader' : ''} color`}>
          <div className={isLoading ? 'loader' : ''}>

          </div>
       </div>
       
      <ArticleContext.Provider value = 
         {
           {
              state,dispatch
           }
        }>
           <CatagoryContext.Provider 
           value = {
              {
                 catagory,dispatchCatagory,authenticate,dispatchauth,auth
              }
           }
           >

               <BrowserRouter>
                  <Header />
                     <Routes>
                        <Route path = "/login" element = { <Login /> } />
                        <Route path = "/register" element = { <Register /> } />
                        <Route path = "/" element = { <Article /> } />
                        <Route path = "/post/1" element = { <SinglePost /> }/>
                     </Routes>
               </BrowserRouter>

           </CatagoryContext.Provider>

    </ArticleContext.Provider>

               
    </div>

  );
  
}

export default App;




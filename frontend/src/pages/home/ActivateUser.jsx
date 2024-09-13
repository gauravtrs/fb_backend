import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/LeftHome';
import Header from '../../components/header/Header';
import RightHome from '../../components/home/right/RightHome';
import Stories from '../../components/home/stories/Stories';
import CreatePost from '../../components/createpost/CreatePost';
import "./style.css";
import ActivateForm from './ActivateForm';
import { useNavigate, useParams } from 'react-router-dom';
import  Cookies from 'js-cookie'
import axios from 'axios';
import { verify } from '../../reduxToolkit/UserSlice';

const ActivateUser = () => {

  
    const user =useSelector((state) =>state.user)
    console.log(user);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {token} =useParams();
    const navigate =useNavigate()
    const dispatch =useDispatch();
    console.log('this is toke: ',token)


    useEffect(()=>{
        activateAccount()
    },[]);

    //activate account function..

    const activateAccount = async() =>{

        try {
             
            const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/activate`,{token},
                { headers: { Authorization: `Bearer ${user.token}` } }
        
         );
         setSuccess(data.message)

         const userCookies =Cookies.get('user');
         if(userCookies){
            const parseCookies =JSON.parse(userCookies);
            parseCookies.verified=true;
            Cookies.set('user',JSON.stringify(parseCookies))
         }

         dispatch(verify());
        

         setTimeout(() => {
                navigate('/');
         },3000)

            
        } catch (error) {
            setError(error.response?.data?.message);

            setTimeout(() => {
                navigate('/');
         },3000)
        }
    }


  return (
    <div className='home'>

        {success && (<ActivateForm
        type="success"
        header='Account verification succeded'
        text={success}
        loading={loading}
        />)}


        {error && (<ActivateForm
          type='error'
          header='Account verification failed.'
          text={error}
          loading={loading}  
        />)}


       <Header/> 
       
       <LeftHome user={user}/>

       <div className="home_middle">
        <Stories/>
        <CreatePost user={user}/>
       </div>
       <RightHome user={user}/>

       
       </div>

  )
}

export default ActivateUser;
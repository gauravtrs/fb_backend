import React, { useState } from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import LoginInput from '../../components/inputs/loginInput/LoginInput'
import DotLoader from 'react-spinners/DotLoader'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import  {loginuser}  from '../../reduxToolkit/UserSlice'
import  Cookies from 'js-cookie'


const loginInfo={
    email:'',
    password:'',
  }

  


const LoginForm = ({setVisible}) => {  
  const [login ,setLogin] =useState(loginInfo)
  const {email ,password}=login

  const loginHandelChange= (e) =>{
    e.preventDefault()
    const {name ,value} =e.target
    setLogin({...login , [name]:value})
  }

  const loginSchema =Yup.object({
    email:Yup.string().required('Email address is required')
    .email('must be a valid email')
    .min(5),
    password:Yup.string().required('password is required').min(6)
  })

  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  const dispatch =useDispatch()

  // login submit
  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {email ,password});
      setLoading(false);

      setError('');
      dispatch(loginuser(data));
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (

    
          <div className="login_wrap">

            <div className="login_1">
              <img src="../../icons/facebook.svg" alt="" />
              <span>Facebook help you connect and share with the people in your life.</span>
            </div>

            <div className="login_2">
              <div className="login_2_wrap">
                <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }
                }
                validationSchema={loginSchema} 
                onSubmit={loginSubmit}

                
                >
                  {(formik)=>(
                  <Form>
                    
                    <LoginInput 
                    type="email"
                    name="email"
                    
                    onChange={loginHandelChange}
                    placeholder='Enter your email or phone'/>

                    <LoginInput 
                    type="password"
                    name="password"
                    bottom
                    onChange={loginHandelChange}
                    placeholder='Password'/>
                    

                    <button type='submit' className="blue_btn">Log In</button>
                  </Form>
                  )}
                </Formik>

                <Link to={'/reset'} className='forget_password'>Forgotten password ?</Link>

                <DotLoader color="#1876f2" loading={loading} size={30} />
                {error && <div className="error_text">{error}</div>} 
                <div className="sign_splitter"></div>

                  <button onClick={() =>{setVisible(true)}} className='blue_btn open_signup'>Create Account</button>
                  </div>
                  
                <Link to={'/'} className="sign_extra"> 
                <b>Create a page</b> 
                for a celebrity , brand or business.
                </Link>

              
            </div>
          </div>

        



    
  )
}

export default LoginForm
import React from 'react'
import './style.css';

import { Form, Formik } from "formik";
import LoginInput from '../../components/inputs/loginInput/LoginInput';
import { Link } from 'react-router-dom';
import * as yup from 'yup'
import axios from 'axios';

const SearchAccount = ({email ,setemail ,error ,setloading ,setError ,setuserinfo ,setvisible}) => {

    const validateEmail =yup.object({
        email:yup.string().required('email address is required')
        .email('Must be a valid email')
        .max(50,"Email address can't be more than 50 characters.")
    })

    const handelSearch = async() =>{
        try {
            setloading(true)
            const {data} =await axios.post(`${process.env.REACT_APP_BACKEND_URL}/finduser`,{email})
            setuserinfo(data)
            setvisible(1)
            setError('')
            
        } catch (error) {
            setloading(false)
            setError(error?.response?.data?.message)
            
        }
    }


  return (
    
    <div className='reset_form'>
    <div className='reset_form_header'>Find your account</div>
    <div className='reset_form_text'>
      Please enter your email address or mobile number to search for your aacount
    </div>
    <Formik 
    enableReinitialize
    initialValues={{
      email
    }}
    validationSchema={validateEmail}
    onSubmit={()=>{handelSearch()}}
    
    >
      {/* {(formik) => */}
        <Form> 
      <LoginInput
      type='text'
      name='email'
      onChange={(e)=>setemail(e.target.value)}
      placeholder='Email address or number'
      

      />
      {error && <div className='error_text'>{error}</div>}
        
        <div className='reset_form_btns'>
          <Link to={'/login'} className='gray_btn'>
          Cancel
          </Link>
          <button type='submit' className='blue_btn'>Search</button>

        </div>
      </Form>
      

      {/* } */}
      

    </Formik>

  </div>
  )
}

export default SearchAccount
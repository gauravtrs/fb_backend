import React from 'react'

import { Form, Formik } from "formik";
import LoginInput from '../../components/inputs/loginInput/LoginInput';
import { Link } from 'react-router-dom';
import  * as yup from 'yup'
import axios from 'axios';


const CodeVerification = ({code ,setcode ,error ,setloading,setvisible,setError,userinfo }) => {

  const {email} =userinfo;

    const codevalidate =yup.object({
        code:yup.string().required('Code is required')
        .min(5, "Code must be 5 characters.")
        .max(5, "Code must be 5 characters.")
    })

    const verifyCode =async() =>{
      try {
        setloading(true)
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/codeverify`,{email ,code})
        setError('')
        setvisible(3);
        setloading(false)


        
      } catch (error) {
        setloading(false)
        setError(error?.response?.data?.message)

        
      }
    }


    
  return (
    <div className="reset_form">
    <div className="reset_form_header">Code verification</div>
    <div className="reset_form_text">
      Please enter code that been sent to your email.
    </div>
    <Formik
      enableReinitialize
      initialValues={{
        code,
      }}
      validationSchema={codevalidate}
    >
      
        <Form>
          <LoginInput
            type="text"
            name="code"
            onChange={(e) => setcode(e.target.value)}
            placeholder="Code"
          />
          {error && <div className="error_text">{error}</div>}
          <div className="reset_form_btns">
            <Link to="/login" className="gray_btn">
              Cancel
            </Link>
            <button onClick={()=>{verifyCode()}} className="blue_btn">
              Continue
            </button>
          </div>
        </Form>
    
    </Formik>
  </div>
  )
}

export default CodeVerification
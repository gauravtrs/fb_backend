import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const SendMail = ({userinfo ,setvisible,email,setError,setuserinfo ,error,setloading,}) => {

  const sendCode = async() =>{
    try {

      setloading(true)
      const {data} =await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendcode`,{email})
      setError('')
      setvisible(2);
      setloading(false);

      
    } catch (error) {
      setloading(false)
      setError(error?.response?.data?.message)
      
    }
  }


  return (
    <div className='reset_form dynamic_height'>
        <div className="reset_form_header">Reset Your Password</div>

        <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userinfo.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userinfo.picture} alt="" />
          <span>{userinfo.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: "10px" }}>
          {error}
        </div>)}

      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button onClick={()=>{sendCode()}} className="blue_btn">
          Continue
        </button>
      </div>


    </div>
  )
}

export default SendMail
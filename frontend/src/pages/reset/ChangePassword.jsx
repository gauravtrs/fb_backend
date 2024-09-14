import React from "react";

import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const ChangePassword = ({
  password,
  setpassword,
  error,
  conf_password,
  setconf_password,
  setError,
  setloading,
  userinfo
}) => {
  const passwordValidate = yup.object({
    password: yup
      .string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),

    conf_password: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match."),
  });

  const {email} = userinfo
  const navigate =useNavigate()

  const passwordChange = async() =>{
    

    try {
      setloading(true)
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changepassword`,{email ,password})
      setError('')
      navigate('/')
      
      
    } catch (error) {
      setloading(false)
      setError(error?.response?.data?.message)

      
    }
  }

  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change password</div>
      <div className="reset_form_text">Please enter your new password.</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={passwordValidate}
        onSubmit={()=>{passwordChange()}}
      >
        <Form>
          <LoginInput
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="password"
          />

          <LoginInput
            type="password"
            name="conf_password"
            onChange={(e) => setconf_password(e.target.value)}
            placeholder="confirm password"
            bottom
          />

          {error && <div className="error_text">{error}</div>}
          <div className="reset_form_btns">
            <Link to="/login" className="gray_btn">
              Cancel
            </Link>
            <button type="submit" className="blue_btn">
              Continue
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;

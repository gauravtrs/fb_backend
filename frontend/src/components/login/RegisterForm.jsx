import { Form, Formik } from "formik";
import { useState } from "react";
import * as yup from 'yup'
import DotLoader from 'react-spinners/DotLoader'
import axios from 'axios'
import RegisterInput from "../inputs/registerInput/RegisterInput";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import {useDispatch ,useSelector} from 'react-redux'
import { loginuser } from "../../reduxToolkit/UserSlice";
import Cookies  from 'js-cookie'
import {useNavigate} from  'react-router-dom'




export default function RegisterForm({setVisible}) {
    
const userInfos = { 
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };

  const dispatch =useDispatch();
  const loginUser =useSelector((state) =>state.user); 
  console.log('user:',loginUser);
  const [user, setUser] = useState(userInfos);
  
    const {first_name ,last_name ,email,password,bYear ,bMonth,bDay ,gender} =user;
    
    const handleRegisterChange = (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    };
    // years calculation
    const currentYear =new Date().getFullYear();
    const years =Array.from(new Array(108),(val ,index) =>currentYear-index);

    //months calculation
    const months =Array.from(new Array(12), (val ,index) => 1+index);
    //date calculation
    const newdate = ()=>{
        return new Date(bYear ,bMonth ,0).getDate();
    }
    
    const currentDate =Array.from(new Array(newdate()) ,(val ,index) => 1+index );
    
    //date of birth  error
    const [dateError ,setdateError] =useState('');
    //Gender Error
    const[genderError ,setgenderError] =useState('');


    const registerSchema = yup.object({
      first_name:yup.string().required('what is your first name?')
      .min(2 , "first name must be between 2 and 16 characters")
      .max(16 ,"first name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/ ,"Number and special characters are not allowed."),

      last_name:yup.string().required('what is your last name?')
      .min(2 , "last name must be between 2 and 16 characters")
      .max(16 ,"last name must be between 2 and 16 characters")
      .matches(/^[aA-zZ]+$/ ,"Number and special characters are not allowed."),

      email:yup.string().required("you'll need this when you log in and if you ever need to reset your password")
      .email("Enter your valid email address."),

      password:yup.string()
      .required("Enter a combination of atleast six number ,letters and punctuation marks (such as ! and $).")
      .min(6 , "Password must be atleast six characters")
      .max(36 , "password can't be more than 36 characters."),

    })

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate =useNavigate()

    //form submit
    const registerSubmit= async() => {
      setLoading(true);

      try {

        const {data}= await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,{
          first_name ,last_name ,email,password,bYear ,bMonth,bDay ,gender
        })

        setError("");
        setSuccess(data.message);
        const {message, ...rest} =data;

        setTimeout(() =>{
            dispatch(loginuser(rest))
            Cookies.set("user" ,JSON.stringify(rest))
            navigate('/')
        },2000)

        

        
      } catch (error) {
        setLoading(false);
      setSuccess("");
      setError(error.response?.data?.message || "An error occurred during registration.");
  
        
      }
    }
      
    
    

    return (
      <div className="blur">
        <div className="register">
          <div className="register_header">
            <i onClick={() =>setVisible(false)} className="exit_icon"></i>
            <span>Sign Up</span>
            <span>it's quick and easy</span>
          </div>
          <Formik 
          enableReinitialize
          validationSchema={registerSchema}
          initialValues={{first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,}}

          onSubmit={() =>{
          const todayDate= new Date();
          const inputDate =new Date(bYear ,bMonth -1 ,bDay);
          let age =todayDate.getFullYear() - inputDate.getFullYear();
          const monthDifference =todayDate.getMonth() -inputDate.getMonth();
          const dateDifference =todayDate.getDate() - inputDate.getDate();
          
          if(monthDifference <0 || (monthDifference === 0 && dateDifference <0)){
            age--
          }

          if (age < 14) {
            setdateError('it looks like you (ve entered the wrong info.please make sure that you use your real date of birth')
        } else if (age > 70) {
            setdateError('it looks like you (ve entered the wrong info.please make sure that you use your real date of birth')
        } else if(gender === "") {
          setdateError("");
          setgenderError('please choose a gender.you can change who can see this later');
            
        } else{
          setdateError("");
          setgenderError("");
          registerSubmit();
        }


          }}

          >
            {(formik) => (
              <Form className="register_form">
                <div className="reg_line">
                  <RegisterInput
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    onChange={handleRegisterChange}
                  />
                  <RegisterInput
                    type="text"
                    placeholder="Surname"
                    name="last_name"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="text"
                    placeholder="Mobile number or email address"
                    name="email"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="password"
                    placeholder="New password"
                    name="password"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Date of birth <i className="info_icon"></i>
                  </div>
                    <DateOfBirthSelect
                    handleRegisterChange={handleRegisterChange}
                    bYear={bYear}
                    bMonth={bMonth}
                    bDay={bDay}
                    dateError={dateError}
                    currentDate={currentDate}
                    months={months}
                    years={years}
                    />
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Gender <i className="info_icon"></i>
                  </div>
                  <GenderSelect 
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}

                  />
                </div>
                <div className="reg_infos">
                  By clicking Sign Up, you agree to our{" "}
                  <span>Terms, Data Policy &nbsp;</span>
                  and <span>Cookie Policy.</span> You may receive SMS
                  notifications from us and can opt out at any time.
                </div>
                <div className="reg_btn_wrapper">
                  <button type="submit" className="blue_btn open_signup">Sign Up</button>
                </div>
                <DotLoader color="#1876f2" loading={loading} size={30} />
                {error && <div className="error_text">{error}</div>}
                {success && <div className="success_text">{success}</div>}

              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
  
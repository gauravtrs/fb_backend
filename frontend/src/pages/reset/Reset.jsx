import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reduxToolkit/UserSlice';
import Cookies from 'js-cookie'
import SearchAccount from './SearchAccount';
import SendMail from './SendMail';
import CodeVerification from './CodeVerification';
import Footer from '../../components/login/Footer';
import ChangePassword from './ChangePassword';





const Reset = () => {

const user = useSelector((state) => state.user)
const dispatch =useDispatch()
const [email ,setemail] =useState('')
const [ error, setError ] = useState("");
const[visible ,setvisible] =useState(0)
const [code ,setcode] =useState('')
const [password ,setpassword] =useState('')
const [conf_password ,setconf_password] =useState('')
const [loading ,setloading] =useState(false)
const [userinfo ,setuserinfo] =useState('')



const logoutuser =() =>{
      dispatch(logout())
      Cookies.remove('user')        
}
console.log('userinfo : ', userinfo)

  return (
    <div className='reset'>
        <div className='reset_header'>
            <img src='../../icons/facebook.svg' alt=''/>
            {
            user ? 
            (<div className='right_reset'>
              <Link to={'/profile'}>
              <img src={user.picture} alt="" />
              </Link>
              
              <button className='blue_btn' onClick={()=>logoutuser()}>Logout</button>

            </div>) 
            
            :
            (<Link to='/login' className='right_reset'>
            <button className='blue_btn'>Login</button>
            </Link>)
            
            }</div>

          <div className="reset_wrap">

            {visible===0 && (<SearchAccount email={email} setemail={setemail} error={error} setvisible={setvisible} 
            setloading={setloading} setError={setError}  setuserinfo={setuserinfo}
            />)}
            {visible===1 && userinfo && (<SendMail userinfo={userinfo} setvisible={setvisible} email={email} 
            setError={setError} setuserinfo={setuserinfo} error={error} setloading={setloading}
            />)}
            {visible===2 && (<CodeVerification user={user} code={code} setcode={setcode} error={error}
             setvisible={setvisible} setError={setError} userinfo={userinfo} setloading={setloading}/>)}

            {visible===3 && (<ChangePassword error={error} password={password} setpassword={setpassword}
            conf_password={conf_password} setconf_password={setconf_password} setvisible={setvisible}
            setError={setError} setloading={setloading} userinfo={userinfo}
            />)}
            
          </div>
          <Footer/>
    </div>
  )
}

export default Reset;
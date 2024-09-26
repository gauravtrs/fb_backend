import React from 'react'
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/LeftHome';
import Header from '../../components/header/Header';
import RightHome from '../../components/home/right/RightHome';
import Stories from '../../components/home/stories/Stories';
import CreatePost from '../../components/createpost/CreatePost';
import SendVerification from '../../components/home/sendVerification/SendVerification';
import "./style.css";



  
  const Home = ({setVisible}) => {



  const user =useSelector((state) =>state.user)
  console.log(user); 

  return (
    <div className='home'>
       <Header/> 
       
       <LeftHome user={user}/>

       <div className="home_middle">
        <Stories/>
        {user.verified  === false && <SendVerification user={user}/>}
        <CreatePost user={user} setVisible={setVisible}/>
       </div>
       <RightHome user={user}/>

       
       </div>
  )
}

export default Home
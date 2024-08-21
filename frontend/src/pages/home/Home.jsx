import React from 'react'
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/LeftHome';
import Header from '../../components/header/Header';
import RightHome from '../../components/home/right/RightHome';
import Stories from '../../components/home/stories/Stories';
import CreatePost from '../../components/createpost/CreatePost';
import "./style.css";


const Home = () => {



  const user =useSelector((state) =>state.user)
  console.log(user);

  return (
    <div className='home'>
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

export default Home
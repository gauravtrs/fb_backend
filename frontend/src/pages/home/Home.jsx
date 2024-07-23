import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header';



const Home = () => {




  

  const user =useSelector((state) =>state.user)
  console.log(user);

  return (
    <div>
       <Header/> 
       
       
       </div>
  )
}

export default Home
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import LeftHome from '../../components/home/left/LeftHome';
import Header from '../../components/header/Header';
import RightHome from '../../components/home/right/RightHome';
import Stories from '../../components/home/stories/Stories';
import CreatePost from '../../components/createpost/CreatePost';
import SendVerification from '../../components/home/sendVerification/SendVerification';
import "./style.css";
import Post from '../../components/post/Post';



  
  const Home = ({setVisible ,getAllData}) => {



  const user =useSelector((state) =>state.user)
  const {loading ,posts ,error} =useSelector((state) =>state.posts)

  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);


  return (
    <div className="home" style={{ height: `${height + 150}px` }} >
      <Header page='home'  getAllData={getAllData}/>
      

      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setVisible={setVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>

  )
}

export default Home
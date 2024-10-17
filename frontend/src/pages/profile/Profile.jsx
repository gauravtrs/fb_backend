import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { profileRequest, profileSuccess, profileError } from '../../reduxToolkit/GetProfile';
import axios from 'axios';
import Header from '../../components/header/Header';
import Cover from './Cover';
import ProfileMenu from './ProfileMenu';
import ProfielPictureInfos from './ProfielPictureInfos';
import './style.css';
import PplYouMayKnow from './PplYouMayKnow';
import CreatePost from '../../components/createpost/CreatePost';
import GridPosts from './GridPosts';
import Post from '../../components/post/Post';
import Photos from './Photos';
import Friends from './Friends';
import Intro from '../../components/intro/Intro';
import { useMediaQuery } from "react-responsive";

const Profile = ({setVisible}) => {
  const { username } = useParams();
  const user = useSelector((state) => state.user);
  console.log(user)
  const { loading, profile, error } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [othername, setOthername] = useState();

  console.log('profileid----',profile)

  
  


  const profilename = username || user.username; 
  var visitor=profilename === user.username ? false :true;
  
  

  useEffect(() => {
    if (profilename) {
      getProfile();
    }
    
    return () => {
      console.log('Cleaning up on unmount');
    };
  }, [profilename]);

  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);






  const getProfile = async () => {
    try {
      dispatch(profileRequest());
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/searchprofile/${profilename}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,  
          },
        }
      );

      if (data.ok === false) {
        navigate('/profile'); 
      } else {
        dispatch(profileSuccess(data));
        
      }
    } catch (error) {
      dispatch(profileError(error.response?.data?.message || 'Error fetching profile'));
    }
  };

  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };


  return (
    
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} />
          <ProfielPictureInfos profile={profile} visitor={visitor}  othername={othername}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}>
              <div className="profile_left" ref={leftSide}>
              <Intro detailss={profile.details} visitor={visitor} setOthername={setOthername}/>
                <Photos username={profilename} token={user.token} />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No posts available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Profile;

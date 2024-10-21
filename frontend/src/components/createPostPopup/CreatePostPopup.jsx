import {  useRef, useState } from "react";
import "./style.css";
import PulseLoader from "react-spinners/PulseLoader";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import AddToYourPost from "./AddToYourPost";
import ImagePrev from "./ImagePrev";
import UseclickOutside from "../../helpers/clickOutside";
import { createPost } from "../../functions/Post";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uplaodImages } from "../../functions/uplaodImages";
import { postsError, postsRequest, postsSuccess } from "../../reduxToolkit/GetAllPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { profilePosts } from "../../reduxToolkit/GetProfile";




export default function CreatePostPopup({ user ,setVisible}) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const popup=useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {posts } =useSelector((state) =>state.posts)
  const dispatch = useDispatch();



  UseclickOutside(popup, () => {
    setVisible(false);
  });


  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status  === "ok") {
        dispatch(postsSuccess([response.data ,...posts]))
        dispatch(profilePosts([response.data ,...posts]))
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${user.username}/post_Images`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uplaodImages(formData, path, user.token);
      let res= await createPost(null, null, text, response, user.id, user.token);
      setLoading(false);
      if(res.status === 'ok'){  
        dispatch(postsSuccess([res.data ,...posts]))  
        dispatch(profilePosts([res.data ,...posts]))     
      setText("");
      setImages("");
      setVisible(false);
      }else{
        setError(res);
      }

    } else if (text) {
      setLoading(true);
      const response = await createPost(
        null,
        null,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);
      if (response.status === "ok") {
        dispatch(postsSuccess([response.data ,...posts]))
        dispatch(profilePosts([response.data ,...posts]))
        setBackground("");
        setText("");
        setVisible(false);
      } else {
        setError(response);
      }
    } else {
      console.log("nothing");
    }

  
  }


  
  

 

  return (
  

        <div className="blur">
          <div className="postBox" ref={popup}>
            {error && <PostError setError={setError} error={error}/>}
            <div className="box_header">
              <div className="small_circle"     onClick={() => {
              setVisible(false);
            }}    >
                <i className="exit_icon"></i>
              </div>
              <span>Create Post</span>
            </div>
            <div className="box_profile">
              <img src={user.picture} alt="" className="box_profile_img" />
              <div className="box_col">
                <div className="box_profile_name">
                  {user.first_name} {user.last_name}
                </div>
                <div className="box_privacy">
                  <img src="../../../icons/public.png" alt="" />
                  <span>Public</span>
                  <i className="arrowDown_icon"></i>
                </div>
              </div>
            </div>

            {!showPrev ? (
              <>  
              <EmojiPickerBackgrounds user={user} text={text}
              setText={setText} showPrev={showPrev}
              background={background}
              setBackground={setBackground}
              />
              </> 

            ) :(<ImagePrev user={user} text={text}  setText={setText} showPrev={showPrev}
              images={images} setImages={setImages} setShowPrev={setShowPrev} setError={setError}
            
            />)}
            

            <AddToYourPost setShowPrev={setShowPrev}/>
            <button className="post_submit" onClick={()=>{postSubmit()}} disabled={loading} >
              {loading ? <PulseLoader color="#fff" size={5}/> :"post"}
            </button>
            
          </div>
        </div>

    

  );
}

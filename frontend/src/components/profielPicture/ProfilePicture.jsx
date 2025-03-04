import React, { useRef, useState } from 'react'
import UpdateProfilePicture from './UpdateProfilePicture'
import './style.css';
import UseclickOutside from '../../helpers/clickOutside';
import { useSelector } from 'react-redux';


const ProfilePicture = ({setshow ,pRef,photos }) => {
   
    const refInput = useRef(null);
    const popPup=useRef(null);
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const user =useSelector((state) =>state.user);

    

  //UseclickOutside(popPup,()=>setshow(false))



    const handleImage = (e) => {
      let file = e.target.files[0];
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif"
      ) {
        setError(`${file.name} format is not supported.`);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        setError(`${file.name} is too large max 5mb allowed.`);
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        setImage(event.target.result);
      };
    };


  return (

    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="postBox pictureBox" ref={popPup}>
        <div className="box_header">
          <div className="small_circle" onClick={() =>setshow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>your profile pictures</h4>
          <div className="old_pictures">
            {photos && photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>other pictures</h4>
          <div className="old_pictures">
            {photos && photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
      </div>

      {image && (<UpdateProfilePicture 
      setImage={setImage}
       image={image} setshow={setshow} 
       setError={setError} pRef={pRef}  />)}
    </div>

  )
}

export default ProfilePicture
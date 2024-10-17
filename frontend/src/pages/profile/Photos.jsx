import axios from 'axios';
import React, { useEffect } from 'react'
import { photoseError, photosRequest, photosSuccess } from '../../reduxToolkit/PhotosSlice';
import { useDispatch, useSelector } from 'react-redux';

const Photos = ({username ,token}) => {
    const { loading, photos, error } = useSelector((state) => state.photos);
    const dispatch=useDispatch()

    



    useEffect(() => {
        if(username){
            getPhotos();
        }
             
        return () => {
          console.log('Cleaning up on unmount');
        };

      },[username]);

      const path = `${username}/*`;
      const max = 30;
      const sort = "desc";
    
    
    

    const getPhotos = async () => {
        try {
          dispatch(photosRequest());
          const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listimage`,{path ,max,sort},
            {
              headers: {
                Authorization: `Bearer ${token}`,  
              },
            }
          );
    
          if(data){
            dispatch(photosSuccess(data));

          }
            console.log('Fetched photos data:', data);
          
        } catch (error) {
          dispatch(photoseError(error.response?.data?.message || 'Error fetching photos'));
        }
      };
    
      

  return (
    
    <div className="profile_card">
      <div className="profile_card_header">
        Photos
        <div className="profile_header_link">See all photos</div>
      </div>
      <div className="profile_card_count">
        {photos.total_count === 0
          ? ""
          : photos.total_count === 1
          ? "1 Photo"
          : `${photos.total_count} photos`}
      </div>
      <div className="profile_card_grid">
        {photos.resources &&
          photos.resources.slice(0, 9).map((img) => (
            <div className="profile_photo_card" key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>



  )
}

export default Photos
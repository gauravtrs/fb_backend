import axios from 'axios';
import React from 'react'

const DeletePost = async(postId ,token) => {
    try {
    
        const { data } = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/deletepost/${postId}`,
           

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        return data;  
      } catch (error) {
        return error.response ? error.response.data.message : "An error occurred";
      }
}

export default DeletePost
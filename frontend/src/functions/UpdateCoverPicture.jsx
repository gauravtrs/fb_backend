import axios from 'axios'
import React from 'react'

const UpdateCoverPicture = async(url ,token) => {

    try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/updatecoverpicture`,
          {
            url,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return "ok";
      } catch (error) {
        return error?.response?.data?.message;
      }

  
}

export default UpdateCoverPicture
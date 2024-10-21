
import axios from 'axios';
import React from 'react'

const GetSearchHistory = async(token) => {
    try {
        
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getsearchhistory`,
    
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return data;
      } catch (error) {
        return error.response.data.message;
      }
}

export default GetSearchHistory
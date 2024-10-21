
import axios from 'axios';
import React from 'react'

const AddToSearchHistory = async(searchUser ,token) => {
    try {
        
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
          { searchUser },
    
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

export default AddToSearchHistory
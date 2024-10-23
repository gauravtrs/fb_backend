
import axios from 'axios';
import React from 'react'

const RemoveSearch = async( searchUser,token) => {
    try { 
        
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/removesearchhistory`,
          {searchUser},
    
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

export default RemoveSearch
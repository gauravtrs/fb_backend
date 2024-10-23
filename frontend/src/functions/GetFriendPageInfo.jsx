

import axios from 'axios';
import React from 'react'

const GetFriendPageInfo = async(token) => {
    try {
        
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getFriendsPageInfos`,
    
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return {status:'ok' , data} ;
      } catch (error) {
        return error.response.data.message;
      }
    
}

export default GetFriendPageInfo
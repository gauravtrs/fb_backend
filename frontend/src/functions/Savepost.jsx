
import axios from 'axios';


const Savepost = async(postId ,token) => {
  
    try {
        
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/savepost/${postId}`,
          {}, 

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('new created commets---' , data)
        return data;  
      } catch (error) {
        return error.response ? error.response.data.message : "An error occurred";
      }

}

export default Savepost
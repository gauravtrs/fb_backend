import axios from "axios"


export const GetReact = async (postId,  token)=>{
    try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getreact/${postId}`,
    
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
    };
    
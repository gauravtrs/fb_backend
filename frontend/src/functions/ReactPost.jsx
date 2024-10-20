import axios from "axios"


export const ReactPost = async (postId, react, token)=>{

    try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/reactpost`,
          {
            postId,
            react,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return "ok";
      } catch (error) {
        return error.response.data.message;
      }
    };  
    
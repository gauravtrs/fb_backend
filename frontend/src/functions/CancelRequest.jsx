import axios from "axios";

export const CancelRequest = async (id, token) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/cancelrequest/${id}`,
        {},
  
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
  
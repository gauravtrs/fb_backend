import axios from "axios";

export const DeleteRequest = async (id, token) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/deleterequest/${id}`,
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
  
import axios from "axios";
export const UpdateProfile = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateprofilepicture`,
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
    return error.response.data.message;
  }
};

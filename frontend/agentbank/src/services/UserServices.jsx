import axios from "../api/axios";
const LOGIN_URL = "/user/login";
const PROFILE_URL = "/user/profile";

export const signInUser = async (email, password) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      JSON.stringify({ email, password }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
    const responseStatus = response.status;
    const responseMessage = response.data.message;
    if (response.data.body.token) {
      const accessToken = response.data.body.token;
      return { responseStatus, responseMessage, accessToken };
    }
  } catch (err) {
    console.log(err);
    const responseStatus = err.response.status;
    const responseMessage = err.response.data.message;
    return { responseStatus, responseMessage };
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.post(PROFILE_URL, JSON.stringify(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    const responseStatus = response.status;
    const responseMessage = response.data.message;
    if (response.data.body) {
      const userProfile = response.data.body;
      return { responseStatus, responseMessage, userProfile };
    }
  } catch (err) {
    console.log(err);
    const responseStatus = err.response.status;
    const responseMessage = err.response.data.message;
    return { responseStatus, responseMessage };
  }
};

const userServices = { signInUser, getUserProfile };

export default userServices;

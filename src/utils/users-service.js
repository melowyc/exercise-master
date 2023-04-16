import axios from "axios";
import { profileRoute } from "./APIRoutes";

const BASE_URL = "https://cs5500-proj-server.onrender.com";
// const BASE_URL = "http://localhost:4000";
export const loadSingleUser = async (username) => {
  const response = await axios.get(`${BASE_URL}/oneuser`, {
    params: { username },
  });
  return response.data;
};

export const register = async (user) => {
  const response = await axios.post(`${BASE_URL}/register`, user);
  console.log("res after register: ", response);
  // const token_response = await axios.post(
  //   `${BASE_URL}/users/${user.username}/token`,
  //   user
  // );
  // console.log("res after creating token: ", token_response);
  const profile_response = await axios.post(profileRoute, {
    username: user.username,
    country: user.country,
  });
  console.log("res after creating profile: ", profile_response);
  return response.data;
};

export const login = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);
  console.log("res after login: ", response);
  localStorage.setItem("userinfo", JSON.stringify(response.data));
  return response.data;
};

export const deleteUser = async (uid) => {
  const response = await axios.delete(`${BASE_URL}/users/${uid}`);
  return response.data;
};

import axios from "axios";

const API_URL = "http://localhost:5555/auth";
const BUYER_API_URL = "http://localhost:5555";

const register = async (userData) => {
  const response = await axios.post(API_URL + "/register/", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login/", userData);
  const userCartResponse = {
    user: response.data,
  };

  if (response.data) {
    if (!response.data.user.isDeleted && !response.data.user.isBlocked) {
      localStorage.setItem("user", JSON.stringify(response.data));
    } 
  }

  return userCartResponse;
};

const logout = async (userData) => {
  const response = await axios.post(API_URL + "/logout");

  if (response.data.message === "Signed Out") {
    localStorage.removeItem("user");
  }
};

const verifyUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/user/verification", config);
  return response.data;
};

const resetPassword = async (email) => {
  const response = await axios.post(API_URL + "/resetpassword", email);
  //console.log("Reset Password Reducer's Response : ", response.data);

  return response.data;
};

const removeAddress = async (addressData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // //console.log("Remove Button", token)

  const response = await axios.post(
    BUYER_API_URL + "/buyer/removeaddress/",
    addressData,
    config
  );
  return response.data;
};

const addNewAddress = async (addressData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // //console.log("New Address :", addressData);

  const response = await axios.post(
    BUYER_API_URL + "/buyer/addaddress/",
    addressData,
    config
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  verifyUser,
  resetPassword,
  removeAddress,
  addNewAddress,
};

export default authService;

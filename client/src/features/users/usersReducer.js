/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/admin/allusers", config);

  return response.data;
};

const fetchOrderUserwise = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/admin/orderuserwise",
    userId,
    config
  );

  return response.data;
};

const fetchMonthlyOrders = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "/admin/allorders/monthwise",
    config
  );

  return response.data;
};

const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/admin/deleteuser",
    userId,
    config
  );

  return response.data;
};

const blockUnblockUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/admin/blockunblockuser",
    userData,
    config
  );

  return response.data;
};

const usersService = {
  fetchUsers,
  fetchOrderUserwise,
  fetchMonthlyOrders,
  deleteUser,
  blockUnblockUser,
};

export default usersService;

/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const API_URL_TO_REMOVE_PRODUCT = "http://localhost:5555/admin/product";

const uploadProduct = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data; boundary=something",
    },
  };

  const response = await axios.post(
    API_URL + "/admin/addproducts",
    formData,
    config
  );

  // //console.log("Response : ", response.data);
  return response.data;
};

const fetchProducts = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/admin/allproducts", config);

  // //console.log("Response : ", response.data);
  return response.data;
};

const removeProduct = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL_TO_REMOVE_PRODUCT + productId,
    config
  );

  // //console.log("Response : ", response.data);
  return response.data;
};

const updateProduct = async (productData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "/admin/product/" + productData.productId,
    productData,
    config
  );

  // //console.log("Response : ", response.data);
  return response.data;
};

const productService = {
  uploadProduct,
  fetchProducts,
  removeProduct,
  updateProduct,
};

export default productService;
/* eslint-disable no-unused-vars */
import axios from "axios";

const API_URL = "http://localhost:5555";

const fetchProducts = async (productReqData) => {
  // //console.log("Fetching Product...", productReqData.filter);
  const filter = productReqData.filter;
  const response = await axios.post(
    API_URL +
      "/products?page=" +
      productReqData.page +
      "&category=" +
      productReqData.category +
      "&sortBy=" +
      productReqData.sortBy,
    filter
  );
  return response.data;
};

const searchQuery = async (query) => {
  const response = await axios.get(API_URL + `/query?query=${query}`);
  return response.data;
};

const fetchOneProduct = async (productId) => {
  const response = await axios.get(API_URL + "/product/" + productId);
  return response.data;
};

const searchProduct = async (productReqData) => {
  const filter = productReqData.filter;
  const response = await axios.post(
    API_URL +
      "/search?page=" +
      productReqData.page +
      "&&query=" +
      productReqData.query +
      "&sortBy=" +
      productReqData.sortBy,
    filter
  );
  //console.log("Response : ", response.data);
  return response.data;
};

const fetchNewArrivals = async (productReqData) => {
  const response = await axios.post(
    API_URL +
      "/newarrivals?page=" +
      productReqData.page +
      "&sortBy=" +
      productReqData.sortBy,
    productReqData.filter
  );
  // //console.log("Response : ", response.data);
  return response.data;
};

const fetchNewArrivalComp = async (quary) => {
  const response = await axios.get(API_URL + "/newarrivalscomp");
  // //console.log("Response : ", response.data);
  return response.data;
};

const fetchTrendingProducts = async (productReqData) => {
  const response = await axios.post(
    API_URL +
      "/trendingproducts?page=" +
      productReqData.page +
      "&sortBy=" +
      productReqData.sortBy,
    productReqData.filter
  );
  // //console.log("Trending Products : ", response.data);
  return response.data;
};

const fetchTrendingProductComp = async (quary) => {
  const response = await axios.get(API_URL + "/trendingproductscomp");
  // //console.log("Trending Products : ", response.data);
  return response.data;
};

const fetchTopSellingComponent = async (quary) => {
  const response = await axios.get(API_URL + "/topsellingcomp");
  // //console.log("Trending Products : ", response.data);
  return response.data;
};

const products = {
  fetchProducts,
  fetchOneProduct,
  searchProduct,
  searchQuery,
  fetchNewArrivals,
  fetchNewArrivalComp,
  fetchTrendingProducts,
  fetchTrendingProductComp,
  fetchTopSellingComponent,
};

export default products;

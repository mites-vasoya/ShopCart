import { responsivePropType } from "@mui/system";
import axios from "axios";

const API_URL = "http://localhost:5555";

const addToCart = async (data, token) => {
  // //console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/addtocart/" + data.userId,
    data,
    config
  );
  return response.data;
};

const updateCart = async (newData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/updatecart/" + newData.userId,
    newData,
    config
  );
  return response.data;
};

const fetchWishList = async (userId, token) => {
  // //console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "/buyer/fetchwishlistprodid/" + userId,
    config
  );
  // //console.log("Fetch Wishlist Initially : ", response.data);
  return response.data;
};

const fetchWishListProducts = async (userId, token) => {
  // //console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "/buyer/fetchwishlistproducts/" + userId,
    config
  );
  // //console.log("Fetch Wishlist Initially : ", response.data);
  return response.data;
};

const fetchCart = async (userId, token) => {
  // //console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    API_URL + "/buyer/fetchcart/" + userId,
    config
  );
  // //console.log("response.data Cart: ", response.data);

  return response.data;
};

const removeFromCart = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "/buyer/removefromcart/" + productId,
    config
  );

  // //console.log("Response : ", response.data);
  return response.data;
};

const addToWishList = async (data, token) => {
  // //console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/addtowishlist/" + data.userId,
    data,
    config
  );
  return response.data;
};

const removeFromWishlist = async (data, token) => {
  // //console.log("Token : ", data.userId);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "/buyer/removewishlist/" + data.userId,
    data,
    config
  );
  return response.data;
};

const placeOrder = async (checkoutData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //console.log("CHECK OUT DATA IN REDUCERS  : ", checkoutData);

  const response = await axios.post(
    API_URL + "/buyer/placeorder",
    checkoutData,
    config
  );
  return response.data;
};

const placeCartOrder = async (checkoutData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //console.log("CHECK OUT DATA IN REDUCERS  : ", checkoutData);

  const response = await axios.post(
    API_URL + "/buyer/placecartorder",
    checkoutData,
    config
  );

  //console.log("Check Out Responseeeeee: ");
  return response.data;
};

const fetchAllOrders = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + "/buyer/fetchallorders/" + userId,
    config
  );

  return response.data;
};

const giveRating = async (ratingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "/buyer/rating/",
    ratingData,
    config
  );

  return response.data;
};

const applyCoupon = async (coupon, token) => {
  // const couponCode = {
  //   coupon: coupon,
  // };
  //console.log("APPLIED COUPON : ");
  const response = await axios.get(API_URL + "/buyer/applycoupon/" + coupon);
  return response.data;
};

const userService = {
  addToCart,
  fetchWishList,
  fetchWishListProducts,
  fetchCart,
  addToWishList,
  updateCart,
  removeFromCart,
  removeFromWishlist,
  placeOrder,
  placeCartOrder,
  fetchAllOrders,
  giveRating,
  applyCoupon,
};

export default userService;

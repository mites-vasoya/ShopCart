// import axios from "axios";

// const API_URL = "http://localhost:5555";

// const placeOrder = async (checkoutData, token) => {
//       const config = {
//             headers : {
//                   Authorization : `Bearer ${token}`,
//             }
//       }

//       //console.log("CHECK OUT DATA IN REDUCERS  : ", checkoutData)


//       const response = await axios.post(
//             API_URL + "/buyer/placeorder",
//             checkoutData,
//             config
//           );

//       return response.data;
// };


// const fetchAllOrders = async (userId, token) => {
//       const config = {
//             headers : {
//                   Authorization : `Bearer ${token}`,
//             }
//       }

//       const response = await axios.get(
//             API_URL + "/buyer/fetchallorders/" + userId,
//             config
//           );

//       return response.data;
// };

// const giveRating = async (ratingData, token) => {
//       const config = {
//             headers : {
//                   Authorization : `Bearer ${token}`,
//             }
//       }

//       const response = await axios.post(
//             API_URL + "/buyer/rating/",
//             ratingData,
//             config
//           );

//       return response.data;
// };

// const orderService = {
//       placeOrder,
//       fetchAllOrders,
//       giveRating
// };

// export default orderService;
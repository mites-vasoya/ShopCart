/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable no-lone-blocks */
import { IconButton, Rating } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Images from "../../components/Images/Images";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { toast } from "react-toastify";
import { fetchOneProduct } from "../../features/products/productsSlice";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addToCart,
  addToWishList,
  applyCoupon,
  fetchCart,
  fetchWishList,
  reset,
  resetCoupon,
  resetIs,
} from "../../features/user/userSlice";
import "./DetailedProductPage.css";

function DetailedProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [wishList, setWishList] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponData, setCouponData] = useState();
  const [couponCode, setCouponCode] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { wishlist, coupon, isError, isAddedCart, userSliceMessage } =
    useSelector((state) => state.user);
  const { product, productMessage } = useSelector((state) => state.products);
  const productId = params.id;
  let outOfStock;

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
  }, [productId]);

  useEffect(() => {
    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishList(userId));
    }

    if (isError) {
      toast.error(userSliceMessage);
      setCouponApplied(false);
      setCouponCode("");
      setCouponData("");
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, productId]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success("Added To Cart...");
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  const handleQuantityChange = (sign) => {
    switch (sign) {
      case "+":
        {
          quantity < 15
            ? setQuantity(quantity + 1)
            : window.alert("You can Select Max 15 Quantity...");
        }
        break;
      case "-":
        {
          quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);
        }
        break;
    }
  };

  const handleWishListButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = product._id;
      const userData = user;
      const userId = userData.user._id;
      const data = {
        userId,
        productId,
      };
      dispatch(addToWishList(data));
    } else {
      toast.error("Not LoggedIn");
    }
  };

  const handleCartButton = () => {
    if (user) {
      const userData = user;
      const userId = userData.user._id;
      const data = {
        userId,
        productId,
        couponData: {
          isApplied: couponApplied,
          couponCode: couponCode,
        },
      };
      dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleBuyNowButton = () => {
    if (product.prodQuantity !== 0 && quantity <= product.prodQuantity) {
      if (user) {
        navigate(`/product/placeorder/${productId}&${quantity}&${couponCode}`);
      } else {
        navigate("/login", { state: { from: location.pathname } });
      }
    } else {
      alert("Currently Product is out of stock...");
    }
  };

  const handleApplyCouponButton = () => {
    if (couponCode !== "") {
      setCouponApplied(true);
      dispatch(applyCoupon(couponCode));
      setCouponData(coupon);
      //console.log("Applying Coupon...", coupon);
    } else {
      alert("Enter Coupon Code...");
    }
  };

  const handleCouponChanges = (e) => {
    setCouponCode(e.target.value);
  };

  return (
    <>
      <ErrorBoundary>
        <div className="details-page">
          <div className="prod-image">
            <Images prodImage={product.prodImage} />
          </div>

          <div className="page-details">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Tooltip title={product.prodName} placement="top">
                <div className="prod-title">{product.prodName}</div>
              </Tooltip>
              <div className="wishlist-button">
                <IconButton onClick={handleWishListButton}>
                  {wishlist.includes(product._id) ? (
                    <FavouriteRoundedIcon
                      color="error"
                      sx={{ fontSize: "40px" }}
                    />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: "40px" }} />
                  )}
                </IconButton>
              </div>
            </div>
            <div className="prod-rating">
              <div style={{ marginRight: "10px", marginTop: "0px" }}>
                {product.rating !== undefined ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                      />{" "}
                      <div
                        style={{
                          fontSize: "14px",
                          marginTop: "auto",
                          marginBottom: "auto",
                          marginLeft: "7px",
                        }}
                      >
                        ({product.reviews.length} Reviews)
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              style={{ display: "flex" }}
              className="prod-Price-MRP-discount"
            >
              <div className="detailed-page-price">
                Price : {product.prodPrice?.toLocaleString("en-IN")} ₹
              </div>
              <div className="detailed-page-mrp">
                MRP : {product.prodMRP?.toLocaleString("en-IN")} ₹
              </div>
              <div className="detailed-page-discount">
                -
                {Math.floor(
                  ((product.prodMRP - product.prodPrice) * 100) /
                    product.prodMRP
                )}
                %
              </div>
            </div>
            <div className="detailed-page-description">
              <h2>Description :</h2>
              <ul>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
                <li style={{ margin: "5px" }}>{product.prodDesc}</li>
              </ul>
            </div>
            <br />

            <div className="offers">
              <h2>Offers : </h2>
              <div className="offers-card-grid">
                <div className="offers-card">
                  <b style={{ marginTop: "3px", fontSize: "15px" }}>
                    {" "}
                    Bank Offer{" "}
                  </b>
                  <p style={{ marginTop: "5px" }}>
                    Upto ₹3,000.00 discount on select Credit Cards, HDFC Bank
                    Debit Cards Upto ₹3,000.00 discount on select Credit Cards
                  </p>
                </div>
                <div className="offers-card">
                  <b style={{ marginTop: "3px", fontSize: "15px" }}>
                    Partner Offers
                  </b>
                  <p style={{ marginTop: "5px" }}>
                    Get GST invoice and save up to 28% on business purchases.
                    Sign up for freeGet GST invoice and save up to 28% on
                    business purchases.
                  </p>
                </div>
                <div className="offers-card">
                  <b style={{ marginTop: "3px", fontSize: "15px" }}>
                    No Cost EMI
                  </b>
                  <p style={{ marginTop: "5px" }}>
                    ₹ {(product.prodPrice / 12)?.toFixed(2)} EMI for 12 Months
                    on selected HDFC, ICICI, SBI, Axis Bank's Credit and Debit
                    Cards
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ width: "90%", margin: "20px auto 0 auto" }} />
            <div className="detail-page-features">
              <div className="replacement-feature">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Icons%20Images%2F7-days-return.png?alt=media&token=5d9485fc-a8a9-43ca-995c-ee6d1df7b7a3"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center", marginTop: "4px" }}>
                  7 Days Replacement
                </p>
              </div>
              <div className="free-delivery-feature">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Icons%20Images%2F4947265.png?alt=media&token=598e23ee-0d92-4ffe-af08-9bc07bd7db3b"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center" }}>Free Delivery</p>
              </div>
              <div className="warranty-policy-feature">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Icons%20Images%2Fwarranty-icon-png-20.jpg?alt=media&token=494a9e33-fde4-439b-a421-cfc60c6a6031"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center", marginTop: "4px" }}>
                  Warranty Policy
                </p>
              </div>
              <div className="good-discount-feature">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/shoppingsite-e25c4.appspot.com/o/Icons%20Images%2F272535.png?alt=media&token=800104b5-08dd-4dc0-a1d1-361d9d5af49e"
                  style={{
                    height: "42%",
                    width: "44%",
                    marginLeft: "28%",
                    marginRight: "auto",
                  }}
                  alt=""
                />
                <p style={{ textAlign: "center", marginTop: "4px" }}>
                  Discount
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="order-details-card">
              <div className="product-stock">
                {product.prodQuantity === 0 ? (
                  <div style={{ color: "rgb(207, 10, 10)" }}>Out Of Stock</div>
                ) : product.prodQuantity < 5 ? (
                  <div style={{ color: "#379237", fontSize: "19px" }}>
                    Hurry Up, Only {product.prodQuantity} left in Stock...
                  </div>
                ) : (
                  <>
                    <div style={{ color: "#379237" }}>In Stock</div>
                  </>
                )}
              </div>
              <div className="prod-quantity">
                {product.prodQuantity !== 0 ? (
                  <>
                    <div style={{ width: "120px", marginTop: "0" }}>
                      Quantity :
                    </div>
                    <div style={{ marginTop: "5px", display: "flex" }}>
                      <div>
                        <button
                          id="quantity-decrease"
                          onClick={() => handleQuantityChange("-")}
                          disabled={product.prodQuantity === 0}
                        >
                          <RemoveIcon
                            sx={{
                              margin: "2px auto 0 0",
                            }}
                          />
                        </button>
                      </div>
                      <div className="quantity" id="quantity-text-field">
                        {quantity}
                      </div>
                      <div>
                        <button
                          id="quantity-increase"
                          onClick={() => handleQuantityChange("+")}
                          disabled={
                            product.prodQuantity === 0 ||
                            quantity >= product.prodQuantity
                          }
                        >
                          <AddIcon
                            sx={{
                              margin: "2px auto 0 0",
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  "Stay Tuned For more update..."
                )}
              </div>
              <div className="total-amount">
                <div style={{ width: "fitContent", marginTop: "1%" }}>
                  {user ? (
                    <>
                      <div className="coupon-code-div">
                        <TextField
                          sx={{
                            "& .MuiInputBase-root": {
                              height: "40px",
                              width: "230px",
                              backgroundColor: "white",
                              border: "1px solid black",
                              borderRadius: "0",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                          }}
                          className="coupon-code-text"
                          variant="outlined"
                          placeholder="Enter Coupon Code"
                          value={couponCode}
                          onChange={handleCouponChanges}
                        />
                        <input
                          type="button"
                          value="Apply"
                          onClick={handleApplyCouponButton}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {couponApplied && coupon.isValid === true ? (
                    <>
                      <div className="coupon-applied-div">
                        <div>{coupon.message}</div>
                        <br />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Subtotal :</div>
                          <div>
                            {(product.prodPrice * quantity)?.toLocaleString(
                              "en-IN"
                            )}{" "}
                            ₹
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Coupon Discount :</div>
                          <div>{coupon.discount} %</div>
                        </div>
                        <hr />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>Total : </div>
                          <div>
                            {Math.ceil(
                              (product.prodPrice *
                                quantity *
                                (100 - coupon.discount)) /
                                100
                            )?.toLocaleString("en-IN")}{" "}
                            ₹
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {outOfStock !== 0 ? (
                        <>
                          Total &nbsp;: &nbsp;
                          {(product.prodPrice * quantity)?.toLocaleString(
                            "en-IN"
                          )}{" "}
                          ₹
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="btns">
                <button id="add-to-cart-button" onClick={handleCartButton}>
                  Add To Cart
                </button>
                <button id="buy-now-button" onClick={handleBuyNowButton}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default DetailedProductPage;

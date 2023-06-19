import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Wishlist.css";

import { Card, Grid, Rating, Typography } from "@mui/material";
import {
  fetchWishListProducts,
  removeFromWishlist,
  resetIs,
} from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { ImageForList } from "../../components/Images/Images";

function ProductCard({ item, userId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveButton = (e, id) => {
    e.stopPropagation();
    //console.log("Remove Button is Clicked...", id);

    const data = {
      userId,
      productId: id,
    };
    dispatch(removeFromWishlist(data));
    // //console.log("User id : ", userId);
  };

  const handleCardClick = () => {
    navigate(`/product/${item._id}`);
  };

  return (
    <>
      <div className="wishlist-card" onClick={handleCardClick}>
        <div className="wishlist-card-image">
          <img
            src={item.prodImage[0]}
            className="card-image-content"
            alt=""
            height="138"
            width="138"
          />
        </div>
        <div className="wishlist-card-product-details">
          <div className="wishlist-card-title">{item.prodName}</div>
          <div className="wishlist-card-rating">
            <Rating
              name="read-only"
              value={item.rating}
              precision={0.5}
              readOnly
            />
          </div>
          <div style={{ display: "flex" }}>
            <div className="wishlist-card-price">
              Price : {item.prodPrice.toLocaleString("en-IN")} ₹
            </div>
            <div className="wishlist-card-remove-btn">
              <input
                type="button"
                value="Remove"
                onClick={(e) => {
                  handleRemoveButton(e, item._id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlistProducts, isError, message, userSliceMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      const userId = user.user._id;
      dispatch(fetchWishListProducts(userId));
    }
  }, []);

  return (
    <>
      {wishlistProducts.length > 0 ? (
        <>
          <div
            style={{
              margin: "2% auto 0 auto",
              width: "fit-content",
              fontSize: "30px",
              fontFamily: "sans-serif",
              textDecoration: "underline",
            }}
          >
            Wishlist
          </div>
          <div>
            {wishlistProducts.map((wishlist) => {
              return <ProductCard item={wishlist} userId={user?.user._id} />;
            })}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "fit-content",
              margin: "4% auto 0 auto",
              fontSize: "35px",
              fontFamily: "sans-serif",
              textDecoration: "underline",
            }}
          >
            Wishlist Is Empty
          </div>
        </>
      )}
    </>
  );
}

export default Wishlist;

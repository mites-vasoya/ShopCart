import React, { useEffect, useState } from "react";
import { Card, Rating } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";
import { ImageForCard } from "./Images/Images";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import {
  addToCart,
  addToWishList,
  fetchWishList,
  reset,
} from "../features/user/userSlice";

export default function ProductCard({ product }) {
  const [wishList, setWishList] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isError, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (user) {
      const userId = user.user?._id;
      dispatch(fetchWishList(userId));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError]);

  const handleCartButton = (e) => {
    e.stopPropagation();
    if (user) {
      const productId = product?._id;
      const userData = user;
      const userId = userData.user?._id;
      const data = {
        userId,
        productId,
        couponData: {
          isApplied: false,
          couponCode: "",
        },
      };
      dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishListButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = product?._id;
      const userData = user;
      const userId = userData.user?._id;
      const data = {
        userId,
        productId,
      };
      dispatch(addToWishList(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  return (
    <>
      <Card
        sx={{ boxShadow: "0 0 10px -5px black", borderRadius: "10px" }}
        key={product?._id}
        className="product-card"
        onClick={handleCardClick}
      >
        <div className="detailed-page-image">
          <ImageForCard prodImage={product?.prodImage} />
        </div>
        <CardContent>
          <div className="products-card-product-name">{product?.prodName}</div>
          <div className="products-card-rating">
            <Rating name="read-only" value={product?.rating} readOnly />
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ fontSize: "17px", marginTop: "8px" }}
          >
            Price : {product?.prodPrice?.toLocaleString("en-IN")} ₹
          </Typography>
        </CardContent>
        <div className="cart-wishlist-buttons">
          <CardActions>
            <IconButton onClick={handleCartButton}>
              {!addToCart ? (
                <AddShoppingCartIcon color="primary" />
              ) : (
                <AddShoppingCartIcon />
              )}
            </IconButton>
            <IconButton onClick={handleWishListButton}>
              {user && wishlist.includes(product?._id) ? (
                <FavouriteRoundedIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="error" />
              )}
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </>
  );
}

export function TopSellingProductCard({ product }) {
  const [wishList, setWishList] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isError, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user) {
      const userId = user.user?._id;
      dispatch(fetchWishList(userId));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError]);

  const handleCartButton = (e) => {
    e.stopPropagation();
    if (user) {
      const productId = product?._id;
      const userData = user;
      const userId = userData.user?._id;
      const data = {
        userId,
        productId,
      };
      dispatch(addToCart(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishListButton = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (user) {
      setWishList(!wishList);
      const productId = product?._id;
      const userData = user;
      const userId = userData.user?._id;
      const data = {
        userId,
        productId,
      };
      dispatch(addToWishList(data));
    } else {
      toast.error("Not Logged In");
    }
  };

  return (
    <>
      <Card
        sx={{ boxShadow: "0 0 10px -5px black", borderRadius: "10px" }}
        key={product?._id}
        className="product-card"
        onClick={handleCardClick}
      >
        <div className="sold-out-quantity">
          {" "}
          {product.ordersCount} Pieces Sold
        </div>
        <div className="detailed-page-image">
          <ImageForCard prodImage={product?.prodImage} />
        </div>
        <CardContent>
          <div className="products-card-product-name">{product?.prodName}</div>
          <div className="products-card-rating">
            <Rating name="read-only" value={product?.rating} readOnly />
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            style={{ fontSize: "17px", marginTop: "8px" }}
          >
            Price : {product?.prodPrice?.toLocaleString("en-IN")} ₹
          </Typography>
        </CardContent>
        <div className="cart-wishlist-buttons">
          <CardActions>
            <IconButton onClick={handleCartButton}>
              {!addToCart ? (
                <AddShoppingCartIcon color="primary" />
              ) : (
                <AddShoppingCartIcon />
              )}
            </IconButton>
            <IconButton onClick={handleWishListButton}>
              {user && wishlist.includes(product?._id) ? (
                <FavouriteRoundedIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="error" />
              )}
            </IconButton>
          </CardActions>
        </div>
      </Card>
    </>
  );
}

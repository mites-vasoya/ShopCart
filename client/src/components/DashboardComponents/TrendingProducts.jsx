import React, { useEffect } from "react";
import "./TrendingProducts.css";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingProductComp,
  reset,
} from "../../features/products/productsSlice";
import { ErrorBoundary } from "../ErrorBoundary";
import ProductCard from "../ProductCard";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductCards({ trendingProducts, wishlist }) {
  let inWishlist;

  return (
    <>
      {trendingProducts.map((product) => {
        if (wishlist.includes(product?._id)) {
          inWishlist = true;
        } else {
          inWishlist = false;
        }
        return (
          <Grid>
            <ProductCard product={product} inWishlist={inWishlist} />
          </Grid>
        );
      })}
    </>
  );
}

function TrendingProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trendingProd, wishlist, isFetching, isError, message } = useSelector(
    (state) => state.products
  );

  let trendingProducts = [{}];

  for (let index = 0; index < 4; index++) {
    // //console.log("Calculating Products for Trending Product Component___");
    // const randomProductIndex = Math.floor(Math.random() * products.length);
    trendingProducts[index] = trendingProd[index];
  }

  useEffect(() => {
    if (isError) {
      toast.error("Error : ", message);
    }

      dispatch(fetchTrendingProductComp());

    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  if (isFetching) {
    return <Spinner />;
  }

  const openNewArrivalsPage = () => {
    navigate("/products/trendingproducts");
  };

  return (
    <>
      <div>
        <h1 id="trending-product-title" onClick={openNewArrivalsPage}>
          Trending Products
        </h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6%", marginTop: "40px" }}
      >
        <ErrorBoundary>
          <Grid container spacing={0}>
            <Grid container item spacing={0}>
              <ProductCards
                trendingProducts={trendingProducts}
                wishlist={wishlist}
              />
            </Grid>
          </Grid>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default TrendingProducts;

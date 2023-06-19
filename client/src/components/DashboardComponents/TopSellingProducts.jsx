import React, { useEffect } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { Grid } from "@mui/material";
import ProductCard, { TopSellingProductCard } from "../ProductCard";

import "./TopSellingProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchTopSellingComponent,
  reset,
} from "../../features/products/productsSlice";

function ProductCards({ products, wishlist }) {
  let inWishlist;

  return (
    <>
      {products.map((product) => {
        //   if (wishlist.includes(product?._id)) {
        //     inWishlist = true;
        //   } else {
        //     inWishlist = false;
        //   }
        return (
          <Grid>
            <TopSellingProductCard product={product} inWishlist={inWishlist} />
          </Grid>
        );
      })}
    </>
  );
}

function TopSellingProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topSelling, wishlist, isFetching, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchTopSellingComponent());
    return () => {
      dispatch(reset());
    };
  }, []);

  const openTopSellingPage = () => {};

  return (
    <>
      <div>
        <h1 id="top-selling-title" onClick={openTopSellingPage}>
          Top Selling
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
                products={topSelling}
                //     wishlist={wishlist}
              />
            </Grid>
          </Grid>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default TopSellingProducts;

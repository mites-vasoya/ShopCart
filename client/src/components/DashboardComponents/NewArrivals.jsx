import React, { useEffect } from "react";
import { Grid } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "../ErrorBoundary";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard";
import Spinner from "../Spinner";
import { fetchNewArrivalComp } from "../../features/products/productsSlice";
import "./NewArrivals.css";
import { useNavigate } from "react-router-dom";
import { reset, resetIs } from "../../features/user/userSlice";

function ProductCards({ NewArrivals }) {
  return (
    <>
      {NewArrivals.map((product) => (
        <Grid item spacing={3}>
          <ProductCard product={product} key={product?._id} />
        </Grid>
      ))}
    </>
  );
}

function NewArrivals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newArrivals, isFetching, isError } = useSelector(
    (state) => state.products
  );

  const { isAddedCart, userSliceMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchNewArrivalComp());

    if (isError) {
      toast.error("Error : ");
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, dispatch]);

  useEffect(() => {
    if (isAddedCart) {
      toast.success("Added To Cart...");
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  if (isFetching) {
    return <Spinner />;
  }

  let NewArrivals = [{}];
  let indexNewArrivals = 0;
  for (let index = newArrivals.length - 1; index >= newArrivals.length - 4; index--) {
    NewArrivals[indexNewArrivals] = newArrivals[index];
    indexNewArrivals++;
  }

  const openNewArrivalsPage = () => {
    navigate("/products/newarrivals");
  };

  return (
    <>
      <div>
        <h1 id="new-arrivals-title" onClick={openNewArrivalsPage}>
          New Arrivals
        </h1>
      </div>
      <div
        className="productCards"
        style={{ width: "90%", marginLeft: "6%", marginTop: "35px" }}
      >
        <ErrorBoundary>
          <Grid container spacing={0}>
            <Grid container item spacing={0}>
              <ProductCards NewArrivals={NewArrivals} />
            </Grid>
          </Grid>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default NewArrivals;

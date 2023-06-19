import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonthlyOrders,
  fetchOrderUserwise,
  fetchUsers,
} from "../../features/users/usersSlice";
import { ImCart } from "react-icons/im";
import { MdPointOfSale, MdInventory } from "react-icons/md";
import { fetchProducts } from "../../features/product/productSlice";
import { fetchTopSellingComponent } from "../../features/products/productsSlice";
import { Chart } from "react-google-charts";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Card, Rating, Typography } from "@mui/material";
import { fetchAllOrders } from "../../features/admin/adminSlice";
import "./AdminDashboard.css";

const optionsForPieChart = {
  legend: "none",
  fontSize: 12,
  pieHole: 0.4,
  is3D: false,
  width: 400,
  height: 400,
  // colors: ['#FB7A21'],
  // backgroundColor: 'red',
  slices: {
    0: { color: "Orange" },
    1: { color: "#0c7509" },
    2: { color: "#a80c0c" },
  },
  backgroundColor: "#2a3035",
  // chartArea: { backgroundColor: '#203b48' },
};

const optionsForLineChart = {
  legend: "none",
  fontSize: 12,
  pieHole: 0.4,
  is3D: false,
  width: 720,
  height: 400,
  vAxis: {
    title: "Orders",
    format: "0",
    color: "white",
    titleTextStyle: { color: "white", fontSize: "20" },
    textStyle: {
      color: "#f8f2e7",
    },
  },
  hAxis: {
    title: "Month",
    format: "0",
    color: "white",
    titleTextStyle: { color: "white", fontSize: "20" },
    textStyle: {
      color: "#f8f2e7",
    },
    baselineColor: "#ffffff",
  },
  colors: ["#09ae40"],
  backgroundColor: "#2a3035",
  chartArea: { width: "84%", height: "70%" },
  lineWidth: 3,
};

function ProductCard({ product }) {
  //console.log("Prod : ", product.ordersCount);
  return (
    <>
      <div className="prod-card">
        <div className="prod-img">
          <img src={product.prodImage} alt="" />
        </div>
        <div className="prod-details">
          <div className="prod-title">{product.prodName}</div>
          <div className="prod-price">Price : {product.prodPrice}</div>
          <div className="prod-orders">Sold Quantity : {product.ordersCount}</div>
        </div>
      </div>
    </>
  );
}

function AdminDashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { orderMonthwise } = useSelector((state) => state.users);
  const { allOrders } = useSelector((state) => state.admin);
  const { products } = useSelector((state) => state.product);
  const { topSelling } = useSelector((state) => state.products);

  const date = new Date();
  let todaysDate = date.toISOString();

  useEffect(() => {
    if (user) {
      dispatch(fetchUsers());
      dispatch(fetchOrderUserwise());
      dispatch(fetchProducts());
      dispatch(fetchMonthlyOrders());
      dispatch(fetchAllOrders());
      dispatch(fetchTopSellingComponent());
    }
  }, [dispatch]);

  let sales = 0;
  let todaysOrders = 0;
  let todaysSales = 0;
  let pendingOrders = 0;
  let cancelledOrders = 0;
  let successOrders = 0;

  let monthlyOrderData = [
    ["Month", "Orders"],
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["Apr", 0],
    ["May", 0],
    ["June", 0],
    ["July", 0],
    ["Aug", 0],
    ["Sep", 0],
    ["Oct", 0],
    ["Nov", 0],
    ["Dec", 0],
  ];

  for (let index = 0; index < allOrders.length; index++) {
    sales = sales + allOrders[index].totalAmount;

    if (allOrders[index].createdAt.split("T")[0] === todaysDate.split("T")[0]) {
      todaysOrders += 1;
      todaysSales = todaysSales + allOrders[index].totalAmount;
    }

    if (allOrders[index].status === "Pending") {
      pendingOrders += 1;
    } else if (allOrders[index].status === "Success") {
      successOrders += 1;
    } else if (allOrders[index].status === "Cancel") {
      cancelledOrders += 1;
    }
  }

  for (let index = 0; index < orderMonthwise.length; index++) {
    if (monthlyOrderData.length > 0) {
      monthlyOrderData[index + 1][1] = orderMonthwise[index].orders;
      // //console.log("Monthly Orders : ", monthlyOrderData);
    }
  }

  let avgRating = 0;

  for (let index = 0; index < products.length; index++) {
    avgRating += products[index].rating;
  }

  avgRating = (avgRating / products.length).toFixed(2);
  // //console.log("All Orders : ", allOrders);

  const OrderStatusData = [
    ["Order Status", ""],
    ["Pending", pendingOrders],
    ["Success", successOrders],
    ["Cancelled", cancelledOrders],
  ];

  return (
    <>
      <div className="dashboard-body">
        <div className="dashboard-quick-insights">
          <div className="dashboard-todays-orders">
            <div className="dashboard-todays-orders-desc">
              <span style={{ fontSize: "28px" }}>{todaysOrders}</span>
              <br />
              Todays Orders
            </div>
            <div className="dashboard-todays-orders-image">
              <ImCart fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-todays-sales">
            <div className="dashboard-todays-sales-desc">
              <span style={{ fontSize: "28px" }}>
                {todaysSales.toLocaleString("en-IN")} ₹
              </span>
              <br />
              Todays Sales
            </div>
            <div className="dashboard-todays-sales-image">
              <ImCart fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-total-orders">
            <div className="dashboard-total-orders-desc">
              <span style={{ fontSize: "28px" }}>{allOrders.length}</span>
              <br />
              Total Orders
            </div>
            <div className="dashboard-total-orders-image">
              <ImCart fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-total-sales">
            <div className="dashboard-total-sales-desc">
              <span style={{ fontSize: "28px" }}>
                {sales.toLocaleString("en-IN")} ₹
              </span>
              <br />
              Total Sales
            </div>
            <div className="dashboard-total-sales-image">
              <MdPointOfSale fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-inventory">
            <div className="dashboard-inventory-desc">
              <span style={{ fontSize: "28px" }}>{products.length}</span>
              <br />
              Total Products
            </div>
            <div className="dashboard-inventory-image">
              <MdInventory fontSize={"50px"} />
            </div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="total-orders-line-chart">
            <div className="total-orders-line-chart-desc">
              Monthly Order Data
            </div>
            <div className="total-orders-line-chart-div">
              <Chart
                chartType="LineChart"
                data={monthlyOrderData}
                options={optionsForLineChart}
              />
            </div>
          </div>
          <div className="order-status-div">
            <div className="order-status-chart-desc">Order Status</div>
            <div className="order-status-chart-div">
              <Chart
                chartType="PieChart"
                data={OrderStatusData}
                options={optionsForPieChart}
              />
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "0px",
              height: "480px",
              marginBottom: "auto",
              marginTop: "0",
            }}
          >
            <div className="top-selling-products">
              <div className="top-selling-prod-desc">Top Selling Products</div>
              <div className="top-selling-prod-grid">
                {topSelling.map((product, index) => {
                  if (index <= 2) {
                    return <ProductCard product={product} />;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

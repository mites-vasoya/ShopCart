import { MenuItem, Select, } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./PaymentDeliveryPage.css";

function PaymentDeliveryPage() {
  const { user } = useSelector((state) => state.auth);
  const [paymentOption, setPaymentOption] = useState("COD");

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid black",
          width: "99.9%",
          height: "900px",
          display: "flex",
        }}
      >
        <div className="delivery-address-div">
          <div className="delivery-address-title-div">Shipping Details :</div>
          <div className="delivery-address-content">
            <div
              className="delivery-address-name"
              style={{ marginTop: "10px", padding: "2px" }}
            >
              Name : {user.user.name}
            </div>
            <div
              className="delivery-address-email"
              style={{ marginTop: "10px" }}
            >
              Email : {user.user.email}
            </div>
            <div
              className="delivery-address-address"
              style={{ marginTop: "10px" }}
            >
              Address : {user.user.address.street}
            </div>
            <div style={{ display: "flex" }}>
              <div
                className="delivery-address-city"
                style={{ marginTop: "10px" }}
              >
                City : {user.user.address.city}
              </div>
              <div
                className="delivery-address-state"
                style={{ marginTop: "10px", marginLeft: "40px" }}
              >
                State : {user.user.address.state}
              </div>
            </div>
          </div>
        </div>
        <div className="payment-info-div">
          <div className="payment-info-title">Payment Info :</div>
          <div className="accepted-cards-icons">
            Accepted Cards : <br />
            <i
              class="fa fa-cc-visa"
              style={{
                color: "navy",
                marginLeft: "0px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              class="fa fa-cc-amex"
              style={{
                color: "blue",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              class="fa fa-cc-mastercard"
              style={{
                color: "red",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              class="fa fa-cc-discover"
              style={{
                color: "orange",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
          </div>

          <div className="payment-details-payment-page">
            <div className="payment-details-payment-page-title">
              Payment Method :
            </div>
            <div className="payment-type-payment-page">
              <Select
                value={paymentOption}
                onChange={handleChange}
                className="payment-select-payment-page"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="COD">Cash On Delivery</MenuItem>
                <MenuItem value="UPI">UPI ID</MenuItem>
                <MenuItem value="CARD">
                  Pay with Credit Card/Debit Card/ ATM Card
                </MenuItem>
              </Select>
            </div>
            <div style={{ marginTop: "21px" }}>
              {paymentOption === "CARD" ? (
                <>
                  <div style={{ display: "flex" }}>
                    <div className="card-holder-name">
                      Card Holder Name
                      <br />
                      <input type="text" />
                    </div>
                    <div className="card-number">
                      Card Number
                      <br />
                      <input type="text" />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="card-expiry-date-year">
                      Enter Exp Month & Year (mm/yyyy)
                      <br />
                      <input type="text" />
                    </div>
                    <div className="card-cvv-number">
                      Enter CVV
                      <br />
                      <input type="text" />
                    </div>
                  </div>
                </>
              ) : paymentOption === "COD" ? (
                <></>
              ) : paymentOption === "UPI" ? (
                <div>
                  <div className="upi-payment-info">
                    Enter UPI ID :
                    <br />
                    <input type="text" />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="payment-button-div">
              <button className="payment-button">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentDeliveryPage;

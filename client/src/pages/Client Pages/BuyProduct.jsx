import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Spinner from "../../components/Spinner";
import {
  addNewAddress,
  removeAddress,
  reset,
} from "../../features/auth/authSlice";
import { Image } from "../../components/Images/Images";
import EmailVerification from "../../components/EmailVerification";
import { fetchOneProduct } from "../../features/products/productsSlice";
import {
  applyCoupon,
  placeOrder,
  resetIs,
} from "../../features/user/userSlice";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./BuyProduct.css";

let userData;

function DeliveryAddress({ address, setDeliveryAddress, deliveryAddress }) {
  const dispatch = useDispatch();

  const handleAddressChange = () => {
    setDeliveryAddress(address);
  };

  const handleRemoveAddress = (e) => {
    e.stopPropagation();
    dispatch(removeAddress(address));

    const allAddress = userData.user.address;

    for (let index = 0; index < allAddress.length; index++) {
      if (
        allAddress[index].street === address.street &&
        allAddress[index].city === address.city &&
        allAddress[index].state === address.state &&
        allAddress[index].pincode === address.pincode
      ) {
        allAddress.splice(index, 1);
        userData.user.address = allAddress;
        localStorage.setItem("user", JSON.stringify(userData));
        break;
      }
    }
    setDeliveryAddress(null);
  };
  return (
    <>
      <div className="order-address" onClick={handleAddressChange} >
        <div className="order-address-radio">
          <input
            type="radio"
            name="address"
            onChange={handleAddressChange}
            checked={
              JSON.stringify(address) === JSON.stringify(deliveryAddress)
            }
          />
        </div>
        <div
          style={{
            marginLeft: "7px",
            marginTop: "1px",
          }}
        >
          {address.street},
          <br />
          {address.city},
          <br />
          {address.state},
          <br />
          Pincode : {address.pincode}
          <br />
        </div>
        <div className="remove-address-button">
          <CloseIcon
            style={{ fontSize: "20px" }}
            onClick={(e) => {
              handleRemoveAddress(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

function BuyProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [emailVerPage, setEmailVerPage] = useState(false);
  const [mainClass, setMainClass] = useState("place-order-page");
  const [paymentOption, setPaymentOption] = useState("cod");
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [openNewAddress, setOpenNewAddress] = useState(false);
  const [newAddress, setAddressNew] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const { product, productMessage } = useSelector((state) => state.products);
  const { user, isVerified } = useSelector((state) => state.auth);

  const {
    isPlaced,
    userSliceMessage,
    isError,
    coupon,
    isPlacing,
    isAddrRemoved,
  } = useSelector((state) => state.user);

  const { street, city, state, pincode } = newAddress;

  let productId = params.id.split("&")[0];
  let quantity = params.id.split("&")[1];
  let couponCode = params.id.split("&")[2];

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      userData = JSON.parse(localStorage.getItem("user"));
      if (couponCode !== "") {
        dispatch(applyCoupon(couponCode));
      }
    }

    dispatch(fetchOneProduct(productId));

    if (isVerified) {
      setEmailVerPage(false);
      setMainClass("place-order-page");
      reset();
    }

    if (isPlaced) {
      alert(`Your Order is Placed...`);
      navigate("/myorders");
    }

    if (isError) {
      alert(userSliceMessage);
    }

    return () => {
      dispatch(resetIs());
    };
  }, [isPlaced, isVerified, isAddrRemoved, user, userSliceMessage]);

  useEffect(() => {
    //console.log("Selected Delivery Address : ", deliveryAddress);
  }, [deliveryAddress]);

  if (isPlacing) {
    <Spinner />;
  }

  const handlePaymentOptionChanges = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleChanges = (e) => {
    setAddressNew((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePayNowButton = () => {
    if (paymentOption === "") {
      alert("Select Payment Option");
    } else if (deliveryAddress === null) {
      alert("Select Delivery Address");
    } else {
      if (!user.user.emailVerified) {
        setEmailVerPage(true);

        if (!emailVerPage) {
          setMainClass("blur-place-order-page");
        }
      } else {
        const userId = user.user._id;

        const newData = {
          userId,
          productId,
          prodImage: product.prodImage,
          prodName: product.prodName,
          quantity,
          productPrice: product.prodPrice,
          paymentOption,
          deliveryAddress: deliveryAddress,
          couponCode,
        };

        // let checkoutData = [];
        // checkoutData.push(newData);
        // //console.log("Checkout Data : ", newData);
        dispatch(placeOrder(newData));
      }
    }
  };

  const handleAddAddrButton = () => {
    setOpenNewAddress(true);
    setDeliveryAddress(null);
    var addressRadio = document.getElementsByName("address");
    for (var i = 0; i < addressRadio.length; i++) {
      if (addressRadio[i].checked) addressRadio[i].checked = false;
    }
  };

  const handleCancelButton = () => {
    setOpenNewAddress(false);
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();

    if (street && city && state && pincode) {
      const newAddress = { street, city, state, pincode };
      dispatch(addNewAddress(newAddress));
      const address = userData.user.address;
      address.push(newAddress);
      localStorage.setItem("user", JSON.stringify(userData));
      setOpenNewAddress(false);
      setDeliveryAddress(null);
      setAddressNew({});
    } else {
      window.alert("Fill all the Fields...");
    }
  };

  return (
    <>
      <ErrorBoundary>
        {Object.keys(product).length > 0 ? (
          <>
            <div className={mainClass}>
              <div className="product-detail-page">
                <Image prodImage={product.prodImage} />
                <div className="buy-product-page-name">{product.prodName}</div>
                <div className="buy-product-page-amount">
                  ₹ {product.prodPrice.toLocaleString("en-IN")}
                </div>
              </div>

              <div className="order-summary">
                <div className="total-bill-summary">
                  <div className="order-summary-title">Summary</div>
                  <div className="order-summary-details">
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        marginLeft: "100px",
                        marginTop: "30px",
                      }}
                    >
                      <div className="summary-product-title">
                        {product.prodName}
                      </div>
                      <div style={{ marginLeft: "100px", width: "70px" }}>
                        x{quantity}
                      </div>
                    </div>
                    <div className="products-total-amount">
                      {couponCode !== "" ? (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Subtotal : </div>
                            <div>
                              {(quantity * product.prodPrice).toLocaleString(
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
                            <div>Discount :</div>
                            <div>{coupon.discount}%</div>
                          </div>
                          <hr />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>Total :</div>
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
                        </>
                      ) : (
                        <>
                          Total :
                          {(quantity * product.prodPrice).toLocaleString(
                            "en-IN"
                          )}{" "}
                          ₹
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  <div className="delivery-address">
                    <div className="delivery-address-title">
                      Delivery Address
                    </div>
                    <div className="address-select" id="address-select-id">
                      {user?.user.address.map((address) => {
                        return (
                          <>
                            <DeliveryAddress
                              address={address}
                              setDeliveryAddress={setDeliveryAddress}
                              deliveryAddress={deliveryAddress}
                            />
                          </>
                        );
                      })}
                      {!openNewAddress ? (
                        <>
                          <input
                            type="button"
                            value="Add New Address"
                            className="add-new-address-button"
                            onClick={handleAddAddrButton}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="payment-details">
                    <div className="payment-details-title">
                      Payment Details :
                    </div>
                    <div className="payment-type">
                      <Select
                        value={paymentOption}
                        onChange={handlePaymentOptionChanges}
                        className="payment-select"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Select Payment Option</MenuItem>
                        <MenuItem value="cod">Cash On Delivery</MenuItem>
                        <MenuItem value="upi">UPI ID</MenuItem>
                        <MenuItem value="card">
                          Pay with Credit Card/Debit Card/ ATM Card
                        </MenuItem>
                      </Select>
                    </div>

                    <div>
                      {paymentOption === "card" ? (
                        <>
                          <div className="payment-details-form">
                            <TextField
                              className="credit-debit-atm-card"
                              variant="standard"
                              placeholder="Card Number"
                              style={{
                                width: "45%",
                                marginLeft: "2.5%",
                                marginBottom: "20px",
                              }}
                            />
                            <TextField
                              className="credit-debit-atm-card"
                              variant="standard"
                              placeholder="Card Holder Name"
                              style={{
                                marginLeft: "5%",
                                marginRight: "2.5%",
                                width: "45%",
                                marginBottom: "20px",
                              }}
                            />
                            <TextField
                              className="credit-debit-atm-card"
                              variant="standard"
                              placeholder="CVV"
                              style={{
                                width: "45%",
                                marginLeft: "2.5%",
                              }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                views={["month", "year"]}
                                disablePast
                                sx={{
                                  marginLeft: "5%",
                                  marginRight: "2.5%",
                                  width: "45%",
                                  marginBottom: "20px",
                                }}
                                slotProps={{
                                  textField: {
                                    variant: "standard",
                                    size: "35px",
                                  },
                                }}
                              />
                            </LocalizationProvider>
                          </div>
                        </>
                      ) : paymentOption === "cod" ? (
                        <></>
                      ) : paymentOption === "upi" ? (
                        <>
                          <div className="payment-details-form">
                            <TextField
                              id="upi-id"
                              variant="standard"
                              placeholder="Enter UPI Id"
                              style={{ width: "70%", marginLeft: "15%" }}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      <button
                        className="payment-button-placeorder-page"
                        onClick={handlePayNowButton}
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "40px",
                    marginLeft: "5%",
                  }}
                >
                  {openNewAddress === true ? (
                    <>
                      <div className="new-address-form">
                        <div
                          style={{
                            width: "fit-content",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <FormControl style={{ width: "600px" }}>
                            <InputLabel> Enter Address </InputLabel>
                            <Input
                              type="text"
                              value={street}
                              onChange={handleChanges}
                              name="street"
                              required
                            />
                          </FormControl>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "600px",
                            justifyContent: "space-between",
                            marginTop: "20px",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        >
                          <FormControl>
                            <InputLabel> Enter City </InputLabel>
                            <Input
                              type="text"
                              value={city}
                              onChange={handleChanges}
                              name="city"
                              required
                            />
                          </FormControl>

                          <FormControl>
                            <InputLabel> Enter State </InputLabel>
                            <Input
                              type="text"
                              value={state}
                              onChange={handleChanges}
                              name="state"
                              required
                            />
                          </FormControl>
                          <FormControl>
                            <InputLabel> Enter Pincode </InputLabel>
                            <Input
                              type="text"
                              value={pincode}
                              onChange={handleChanges}
                              name="pincode"
                              required
                            />
                          </FormControl>
                        </div>
                        <div className="new-address-form-button">
                          <input
                            type="button"
                            value="Save"
                            onClick={handleSaveNewAddress}
                          />
                          <input
                            type="button"
                            value="Cancel"
                            onClick={handleCancelButton}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {emailVerPage ? (
              <div className="email-verification">
                <EmailVerification
                  email={user.user.email}
                  emailVerPage={emailVerPage}
                  setEmailVerPage={setEmailVerPage}
                  setMainClass={setMainClass}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          ""
        )}
      </ErrorBoundary>
    </>
  );
}

export default BuyProduct;

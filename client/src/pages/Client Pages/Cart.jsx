/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  Card,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./Cart.css";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import EmailVerification from "../../components/EmailVerification";
import {
  applyCoupon,
  fetchCart,
  placeCartOrder,
  removeFromCart,
  reset,
  resetIs,
  updateCartQuantity,
} from "../../features/user/userSlice";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addNewAddress, removeAddress } from "../../features/auth/authSlice";
import { ImageForCart, ImageForList } from "../../components/Images/Images";

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
      <div className="cart-order-address" onClick={handleAddressChange}>
        <div className="cart-order-address-radio">
          <input
            type="radio"
            name="address"
            onChange={handleAddressChange}
            checked={
              JSON.stringify(address) === JSON.stringify(deliveryAddress)
            }
          />
        </div>
        <div style={{ marginLeft: "7px", marginTop: "1px" }}>
          {address?.street},
          <br />
          {address?.city},
          <br />
          {address?.state},
          <br />
          Pincode : {address?.pincode}
          <br />
        </div>
        <div className="cart-remove-address-button">
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

function ProductCard({ item }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(item.quantity);
  let subTotal = item.prodPrice * item.quantity;

  const handleRemoveButton = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (sign, id) => {
    switch (sign) {
      case "+":
        {
          quantity < 10
            ? setQuantity(quantity + 1)
            : window.alert("You can Select Max 10 Quantity...");

          //Update Cart Quantity...
          if (quantity < 10) {
            const newData = {
              userId: user.user._id,
              productId: id,
              newQuantity: quantity + 1,
            };
            dispatch(updateCartQuantity(newData));
          }
        }
        break;
      case "-":
        {
          quantity > 1 ? setQuantity(quantity - 1) : setQuantity(quantity);

          if (quantity > 1) {
            const newData = {
              userId: user.user._id,
              productId: id,
              newQuantity: quantity - 1,
            };
            dispatch(updateCartQuantity(newData));
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="cart-cards-grid">
        <div className="cart-prod-card-img">
          <ImageForCart prodImage={item.prodImage} />
        </div>
        <div className="cart-prod-card-details">
          <div className="prod-title">{item.prodName}</div>
          <div className="prod-price">Price : {item.prodPrice} ₹</div>
          <div className="prod-quantity-btn">
            {item.prodQuantity > 0 ? (
              <>
                <div>
                  <button
                    className="decrease-quantity"
                    onClick={() => handleQuantityChange("-", item._id)}
                  >
                    <RemoveIcon
                      sx={{
                        margin: "2px auto 0 0",
                      }}
                    />
                  </button>
                </div>

                <div className="quantity">{item.quantity}</div>

                <div>
                  <button
                    className="increase-quantity"
                    onClick={() => handleQuantityChange("+", item._id)}
                    disabled={
                      item.prodQuantity === 0 || quantity >= item.prodQuantity
                    }
                  >
                    <AddIcon
                      sx={{
                        margin: "2px auto 0 0",
                      }}
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    className="decrease-quantity"
                    onClick={() => handleQuantityChange("-", item._id)}
                    disabled
                  >
                    <RemoveIcon
                      sx={{
                        margin: "2px auto 0 0",
                      }}
                    />
                  </button>
                </div>

                <div
                  className="quantity"
                  onClick={() => handleQuantityChange("-", item._id)}
                >
                  {item.quantity}
                </div>

                <div>
                  <button
                    className="increase-quantity"
                    onClick={() => handleQuantityChange("+", item._id)}
                    disabled
                  >
                    <AddIcon
                      sx={{
                        margin: "2px auto 0 0",
                      }}
                    />
                  </button>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "fit-content",
                    marginTop: "1%",
                    marginBottom: "4%",
                    fontSize: "25px",
                  }}
                >
                  Out Of Stock
                </div>
              </>
            )}
            <div style={{ margin: "0 0 0 auto" }}>
              <button
                className="remove-item-cart-button"
                onClick={() => {
                  handleRemoveButton(item._id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="prod-total">
          {item?.couponData?.isApplied ? (
            <>
              {item.couponData.validCoupon ? (
                <>
                  <div className="coupon-title">Coupon Applied...</div>
                  <div className="prod-subtotal">
                    Subtotal : {subTotal.toLocaleString("en-IN")} ₹
                  </div>
                  <div className="prod-discount">
                    Discount : {item.couponData.discount}%
                  </div>
                  <div className="prod-coupon-total">
                    Total :{" "}
                    {Math.ceil(
                      (subTotal * (100 - item.couponData.discount)) / 100
                    ).toLocaleString("en-IN")}{" "}
                    ₹
                  </div>
                </>
              ) : (
                <>
                  <div className="coupon-title">
                    Coupon is no Valid Longer...
                  </div>
                  <div className="prod-subtotal">
                    SubTotal : {subTotal.toLocaleString("en-IN")} ₹
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="prod-subtotal" style={{ margin: "10px 0px" }}>
                SubTotal : {subTotal.toLocaleString("en-IN")} ₹
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function PaymentDeliveryPage({
  handlePaymentButton,
  paymentOption,
  setPaymentOption,
  address,
  setDeliveryAddress,
  setAddressNew,
  newAddress,
  mainClass,
  deliveryAddress,
}) {
  const dispatch = useDispatch();

  const handlePaymentOptionChanges = (event) => {
    setPaymentOption(event.target.value);
  };
  const { street, city, state, pincode } = newAddress;
  const [openNewAddress, setOpenNewAddress] = useState(false);

  const handleAddAddrButton = () => {
    setOpenNewAddress(true);
    setDeliveryAddress({});
    var addressRadio = document.getElementsByName("address");
    for (var i = 0; i < addressRadio.length; i++) {
      if (addressRadio[i].checked) addressRadio[i].checked = false;
    }
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

  const handleChanges = (e) => {
    setAddressNew((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelButton = () => {
    setOpenNewAddress(false);
  };

  return (
    <>
      <div
        style={{
          width: "99.9%",
          height: "fit-content",
          paddingBottom: "20px",
          display: "flex",
          marginTop: "20px",
        }}
        className={mainClass}
      >
        <div className="cart-delivery-address">
          <div className="cart-delivery-all-address">
            <div className="delivery-address-title">Delivery Address</div>
            <div className="cart-address-select" id="address-select-id">
              {address?.map((address) => {
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

        <div className="payment-info-div">
          <div className="payment-info-title">Payment Info :</div>
          <div className="accepted-cards-icons">
            Accepted Cards : <br />
            <i
              className="fa fa-cc-visa"
              style={{
                color: "navy",
                marginLeft: "0px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              className="fa fa-cc-amex"
              style={{
                color: "blue",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              className="fa fa-cc-mastercard"
              style={{
                color: "red",
                marginLeft: "15px",
                marginTop: "15px",
                fontSize: "40px",
              }}
            ></i>
            <i
              className="fa fa-cc-discover"
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
                onChange={handlePaymentOptionChanges}
                className="payment-select-payment-page"
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

            <div
              style={{
                marginTop: "10px",
                marginLeft: "3%",
                width: "90%",
                // border: "1px solid black",
              }}
            >
              {paymentOption === "card" ? (
                <>
                  <div className="cart-payment-details-form">
                    <TextField
                      className="cart-payment-select"
                      variant="standard"
                      placeholder="Card Holder Name"
                      style={{
                        width: "45%",
                        marginLeft: "2.5%",
                        marginBottom: "px",
                      }}
                    />
                    <TextField
                      className="cart-payment-select"
                      variant="standard"
                      placeholder="Card Number"
                      style={{
                        marginLeft: "5%",
                        marginRight: "2.5%",
                        width: "45%",
                        marginBottom: "20px",
                      }}
                    />
                    <TextField
                      className="cart-payment-select"
                      variant="standard"
                      placeholder="Enter CVV"
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
                          marginBottom: "15px",
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
                  <div className="cart-payment-details-form">
                    <TextField
                      className="upi-payment-info"
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

            <div className="payment-button-div">
              <button className="payment-button" onClick={handlePaymentButton}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [paymentOption, setPaymentOption] = useState("cod");

  const [emailVerPage, setEmailVerPage] = useState(false);
  const [mainClass, setMainClass] = useState("cart-payment-details");

  const { user } = useSelector((state) => state.auth);
  const { cart, coupon, isAddedCart, userSliceMessage } = useSelector(
    (state) => state.user
  );
  const { isPlaced, isError } = useSelector((state) => state.user);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const [newAddress, setAddressNew] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  let outOfStock;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (isError) {
      //console.log("Error Message : ", userSliceMessage);
      toast.error(userSliceMessage);
    }

    if (user) {
      dispatch(fetchCart(userId));
      userData = JSON.parse(localStorage.getItem("user"));
    }

    if (isPlaced) {
      if (userSliceMessage.outOfStock <= 0) {
        alert("Order Placed Successfully");
      } else if (userSliceMessage.outOfStock > 0) {
        alert(
          `${userSliceMessage.successfull} Order Placed Successfully, ${userSliceMessage.outOfStock} are out of stocks...`
        );
      }
      //console.log("Order Placed Message : ", userSliceMessage);
      navigate("/myorders");
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isPlaced, isError]);

  useEffect(() => {
    return () => {
      dispatch(resetIs());
    };
  }, [isAddedCart]);

  let subTotal = 0;
  let totalAmount = 0;

  for (let index = 0; index < cart.length; index++) {
    if (cart[index].prodQuantity !== 0) {
      if (
        cart[index].couponData?.isApplied &&
        cart[index].couponData?.validCoupon
      ) {
        subTotal =
          subTotal +
          Math.ceil(
            (cart[index].quantity *
              cart[index].prodPrice *
              (100 - cart[index].couponData.discount)) /
              100
          );
      } else {
        subTotal = subTotal + cart[index].quantity * cart[index].prodPrice;
      }
    }
  }

  if (coupon.discount) {
    totalAmount = Math.ceil(
      (Number(subTotal) * (100 - Number(coupon.discount))) / 100
    );
  } else {
    totalAmount = subTotal;
  }

  const userId = user?.user._id;

  const handleCheckout = () => {
    setPage(!page);
  };

  const handlePaymentButton = () => {
    let checkoutData = [];

    if (paymentOption === "") {
      alert("Select Payment Option");
    } else if (deliveryAddress === null) {
      alert("Select Delivery Address");
    } else {
      if (!user.user.emailVerified) {
        setEmailVerPage(true);

        if (!emailVerPage) {
          setMainClass("blur-cart-payment-details");
        }
      } else {
        for (let index = 0; index < cart.length; index++) {
          if (cart[index].prodQuantity !== 0) {
            const newData = {
              userId,
              productId: cart[index]._id,
              prodImage: cart[index].prodImage,
              prodName: cart[index].prodName,
              quantity: cart[index].quantity,
              productPrice: cart[index].prodPrice,
              paymentOption,
              deliveryAddress: deliveryAddress,
              couponData: cart[index].couponData,
            };
            checkoutData.push(newData);
          }
        }
        dispatch(placeCartOrder(checkoutData));
      }
    }
  };

  return (
    <>
      {cart.length !== 0 ? (
        page ? (
          <>
            <div className="cart-table-title">Cart</div>
            <div style={{ border: "0px solid black", display: "flex" }}>
              <div className="cart-product-card">
                <Grid container rowSpacing={1}>
                  {cart.map((item) => {
                    return <ProductCard item={item} />;
                  })}
                </Grid>
              </div>
              <div className="cart-grand-total">
                <div className="grand-total-summary-title"> Cart Summary :</div>
                {outOfStock !== 0 ? (
                  <>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <div className="total-title">Subtotal :</div>
                      <div className="total-value">
                        {subTotal.toLocaleString("en-IN")} ₹
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className="shipping-charge-title">
                        Shipping Charge :
                      </div>
                      <div className="shipping-charge-value">0 ₹</div>
                    </div>
                    <hr style={{ marginTop: "20px" }} />
                    <div style={{ display: "flex" }}>
                      <div className="grand-total-title">Total Amount :</div>
                      <div className="grand-total-value">
                        {totalAmount.toLocaleString("en-IN")} ₹
                      </div>
                    </div>
                    <div className="cart-page-checkout-button">
                      <button
                        className="checkout-button"
                        onClick={handleCheckout}
                      >
                        CHECKOUT
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <PaymentDeliveryPage
              handlePaymentButton={handlePaymentButton}
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
              address={user?.user.address}
              setDeliveryAddress={setDeliveryAddress}
              setAddressNew={setAddressNew}
              newAddress={newAddress}
              mainClass={mainClass}
              deliveryAddress={deliveryAddress}
            />
            {mainClass === "blur-cart-payment-details" ? (
              <></>
            ) : (
              <>
                <div
                  style={{
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "20px",
                    marginTop: "35px",
                  }}
                >
                  <button
                    style={{
                      width: "70px",
                      height: "30px",
                      fontSize: "15px",
                      border: "1px solid black",
                      backgroundColor: "white",
                      fontWeight: "bold",
                      opacity: "0.7",
                    }}
                    onClick={handleCheckout}
                  >
                    Back
                  </button>
                </div>
              </>
            )}

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
        )
      ) : (
        <>
          <div align="center">
            <h1
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "35px",
                fontWeight: "bold",
              }}
            >
              Cart is Empty
            </h1>
          </div>
        </>
      )}
    </>
  );
}

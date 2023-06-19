/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./AddEditProduct.css";
import { reset, uploadProduct } from "../../features/admin/adminSlice";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    prodName: "",
    prodDesc: "",
    prodCategory: "",
    prodMRP: "",
    prodQuantity: "",
    prodPrice: "",
    paymentType: "",
    prodImage: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [image, setImage] = useState([]);
  const [paymentType, setPaymentType] = React.useState([]);
  let imgArr = [];
  let binaryData = "";
  let imageByteArray = "";

  const { products, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Product Added Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      setProductData({
        prodName: "",
        prodDesc: "",
        prodCategory: "",
        prodQuantity: "",
        prodMRP: "",
        prodPrice: "",
        prodImage: [],
      });

      setSelectedCategory("Select Category");
      setImage([]);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const categories = [
    "Select Category",
    "Clothes",
    "Footware",
    "Accessories",
    "Smart Phones",
    "Other",
  ];

  const {
    prodName,
    prodDesc,
    prodCategory,
    prodQuantity,
    prodPrice,
    prodMRP,
    prodImage,
  } = productData;

  const handleChanges = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    setImage([...image, ...ImagesArray]);
    // //console.log("Image : ", image);
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "Select Category") {
      return;
    } else {
      setSelectedCategory(e.target.value);
    }
  };

  const handlePaymentChanges = (e) => {
    if (e.target.value === "Select Payment Options") {
      return;
    } else {
      setPaymentType(e.target.value);
    }
  };

  const deleteFile = (e) => {
    const s = image.filter((item, index) => index !== e);
    setImage(s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (prodName === "") {
      alert("Enter Product Name");
    } else if (prodDesc === "") {
      alert("Enter Product Description");
    } else if (prodQuantity === "" || Number(prodQuantity) < 0) {
      alert("Enter Valid Quantity");
    } else if (prodPrice === "" || Number(prodPrice) < 0) {
      alert("Enter Valid Product Price");
    } else if (prodMRP === "" || Number(prodMRP) < 0) {
      alert("Enter Valid MRP");
    } else if (Number(prodMRP) < Number(prodPrice)) {
      alert("MRP must be greater than Price");
    } else if (selectedCategory === "") {
      alert("Enter Product Category");
    } else if (paymentType === "") {
      alert("Enter Product Payment Type");
    } else {
      const form = document.getElementById("add-product-form");

      const formData = new FormData(form);
      formData.append("prodName", prodName);
      formData.append("prodDesc", prodDesc);
      formData.append("prodCategory", selectedCategory);
      formData.append("prodMRP", prodMRP);
      formData.append("paymentType", paymentType);
      formData.append("prodQuantity", prodQuantity);
      formData.append("prodPrice", prodPrice);
      formData.append("prodImage", image);

      // //console.log("image Array : ", Number(prodPrice));
      dispatch(uploadProduct(formData));

      // //console.log("In Product Upload Page...", productData);
    }
  };

  return (
    <div className="addproductform">
      <h1
        style={{
          textAlign: "center",
          marginTop: "5px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          fontFamily: "sans-serif",
          borderBottom: "1px solid #000000",
          width: "fit-content",
          color: "#2a3035",
          backgroundColor: "#f0f3ed",
          cursor: "default",
        }}
      >
        Add Product
      </h1>
      <form id="add-product-form">
        <FormGroup
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "80px",
            paddingBottom: "80px",
            paddingLeft: "60px",
            paddingRight: "60px",
            border: "1px solid #000000",
            boxShadow: "7px 7px 16px -1px rgba(0, 0, 0, 0.4) ",
            borderRadius: "30px",
            backgroundColor: "white",
          }}
        >
          <FormControl>
            <TextField
              type="text"
              value={prodName}
              onChange={handleChanges}
              name="prodName"
              placeholder="Product Name"
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              type="textfield"
              value={prodDesc}
              onChange={handleChanges}
              name="prodDesc"
              multiline
              rows={4}
              placeholder="Product Description"
              required
            />
          </FormControl>
          <br />

          <div
            style={{
              display: "flex",
              border: "0px solid black",
              width: "100%",
            }}
          >
            <TextField
              type="number"
              value={prodQuantity}
              onChange={handleChanges}
              name="prodQuantity"
              placeholder="Quantity"
              style={{ width: "30%", marginLeft: "0%", marginRight: "auto" }}
              InputProps={{ inputProps: { min: 0 } }}
              required
            />

            <TextField
              type="text"
              value={prodPrice}
              onChange={handleChanges}
              name="prodPrice"
              variant="outlined"
              placeholder="Price"
              style={{
                width: "30%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              required
            />

            <TextField
              type="text"
              value={prodMRP}
              onChange={handleChanges}
              name="prodMRP"
              variant="outlined"
              placeholder="MRP"
              style={{ width: "30%", marginLeft: "auto", marginRight: "0%" }}
              required
            />
          </div>
          <br />

          <div style={{ display: "flex" }}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Select Category"
              name="prodCategory"
              style={{ width: "100%", marginLeft: "0px", marginRight: "auto" }}
            >
              {categories.map((category, index) => {
                return (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <br />

          <FormControl>
            <InputLabel>
              Upload Product Image : <small> (Max. 5 Images) </small>
            </InputLabel>
            <br />
            <br />
            <br />
          </FormControl>
          <input
            type="file"
            accept="image/*"
            style={{
              border: "1px solid #BFBFBF",
              borderRadius: "5px",
              padding: "15px",
            }}
            name="prodImage"
            onChange={handleImageChange}
            disabled={image.length === 6}
            multiple
          />
          <div className="row image-container">
          {image.length > 0 &&
              image.map((item, index) => {
                return (
                  <div className={`image-div img${index+1}`} key={item}>
                    <img src={item} className="image" alt="" />
                    <button
                      type="button"
                      className="delete-image"
                      onClick={() => deleteFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#2a3035",
              color: "White",
              fontSize: "15px",
              fontWeight: "bolder",
            }}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AddProduct;

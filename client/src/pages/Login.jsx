/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [blockDelete, setBlockDelete] = useState(true);

  const { email, password } = formData;

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (message) {
      toast.error(message);
    }

    if (user) {
      //console.log("---TRYING TO LOGIN____", message);
      if (user.role === "buyer") {
        if (user.user.isDeleted === true) {
          //console.log("User is Deleted___-");
          toast.error("Your Account Has Been Deleted By User...")
        } else if (user.user.isBlocked === true) {
          if (blockDelete === true) {
            toast.error("Your Account has been Blocked By Admin");
            setBlockDelete(false);
          }
        } else {
          navigate(location.state?.from || "/");
        }
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleChanges = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    // window.alert(`Email : ${email}, Password : ${password}`);
    if (email === "" || password === "") {
      window.alert("Fill all the fields...");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      window.alert("Enter Valid Email Id");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };
  return (
    <>
      <div className="loginform">
        <h1 className="login-title">Login</h1>
        <FormGroup className="login-form">
          <FormControl>
            <InputLabel> Enter Email :</InputLabel>
            <Input
              name="email"
              value={email}
              id="email"
              onChange={handleChanges}
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <InputLabel> Enter Password :</InputLabel>
            <Input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={handleChanges}
              required
            />
          </FormControl>
          <div
            className="forgot-link"
            onClick={() => {
              navigate("/resetpassword");
            }}
          >
            Forgot Password ?
          </div>
          <br />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2a3035",
              color: "White",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "5px",
            }}
            className="login-button"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div
            className="sign-up-link"
            onClick={() => {
              navigate("/register");
            }}
          >
            Doesn't Have An Account ? Click Here To Sign Up
          </div>
        </FormGroup>
      </div>
    </>
  );
}

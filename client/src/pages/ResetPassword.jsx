import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, resetPassword } from "../features/auth/authSlice";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [message]);

  const handleChanges = (e) => {
    setEmail(e.target.value);
  };

  const handleSendLink = (e) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      window.alert("Enter Valid Email Id...");
    } else {
      dispatch(resetPassword({ email }));
    }
  };

  const handleBackButton = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="reset-password">
        <h1 className="reset-password-title">Reset Password</h1>
        <FormGroup className="reset-password-form">
          <FormControl>
            <InputLabel> Enter Email :</InputLabel>
            <Input
              name="email"
              id="email"
              value={email}
              onChange={handleChanges}
              required
            />
          </FormControl>
          <br />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#2a3035",
              color: "White",
              fontWeight: "bold",
              fontSize: "15px",
              marginTop: "20px",
            }}
            onClick={handleSendLink}
          >
            Send Link
          </Button>
          <div
            className="reset-password-back-button"
            onClick={handleBackButton}
          >
            Back
          </div>
        </FormGroup>
      </div>
    </>
  );
}

export default ResetPassword;

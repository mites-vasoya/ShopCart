import React from "react";
import { useSelector } from "react-redux";

function EditAdminProfile() {
  const { users } = useSelector((state) => state.auth);
  // //console.log("User Profile : ", users);
  return <div style={{ margin: "150px" }}>EditAdminProfile</div>;
}

export default EditAdminProfile;

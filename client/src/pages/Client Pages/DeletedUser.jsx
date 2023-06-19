import React from "react";
import "./DeletedUser.css";
import { RiDeleteBin5Fill } from "react-icons/ri";

function DeletedUser() {

  
  return (
    <>
      <div className="deleted-user-box">
        <div
          className="deleted-user-box-icon"
        >
          <RiDeleteBin5Fill fontSize="70px" color="#2a3035" />
        </div>
        <div className="deleted-user-box-text">Your Account Has Been Deleted By Admin</div>
      </div>
    </>
  );
}

export default DeletedUser;

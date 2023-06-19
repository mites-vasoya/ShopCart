import React from "react";
import { TbLockAccessOff } from "react-icons/tb";
import "./BlockedUser.css";

function BlockedUser() {
  return (
    <>
      <div className="blocked-user-box">
        <div className="blocked-user-box-icon">
          <TbLockAccessOff fontSize="70px" color="#2a3035" />
        </div>
        <div className="blocked-user-box-text">
          Your Account Has Been Blocked By Admin
        </div>
      </div>
    </>
  );
}

export default BlockedUser;

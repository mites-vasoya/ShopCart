import React from "react";
import "./SideBar.css";
import { RiDashboardFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <ul>
          <Link
            style={{ textDecoration: "None", color: "#f0f3ed" }}
            to="/admin/dashboard"
          >
            <li>
              <RiDashboardFill /> <div> Dashboard </div>
            </li>
          </Link>
          <Link
            style={{ textDecoration: "None", color: "#f0f3ed" }}
            to="/admin/orders"
          >
            <li>
              <FaCartArrowDown /> <div>Orders </div>
            </li>
          </Link>
          <Link
            style={{ textDecoration: "None", color: "#f0f3ed" }}
            to="/admin/addproduct"
          >
            <li>
              <SiAddthis /> <div>Add Products </div>
            </li>
          </Link>
          <Link
            style={{ textDecoration: "None", color: "#f0f3ed" }}
            to="/admin/allproduct"
          >
            <li>
              <MdInventory />
              <div>Inventory </div>
            </li>
          </Link>
          <Link
            style={{ textDecoration: "None", color: "#f0f3ed" }}
            to="/admin/alluser"
          >
            <li>
              <FaUsers /> <div>All Users </div>
            </li>
          </Link>
          <Link
            style={{ textDecoration: "None", color: "#f0f3ed" }}
            to="/admin/messages"
          >
            <li>
              <SiGooglemessages /> <div>Messages </div>
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default SideBar;

import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product from "../../assets/Product_Cart.svg";
import list_product from "../../assets/Product_list_icon.svg";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa6";
import { useContext } from "react";
import { AdminContext } from "../Context/ContextApi";
import { useEffect } from "react";

function Sidebar() {
  const { superAdmin } = useContext(AdminContext);
  useEffect(() => {
    console.log(superAdmin);
  }, [superAdmin]);
  return (
    <div className="sidebar">
      <Link to="/addProduct">
        <div className="link-container">
          <img src={add_product} alt="add" />
          Add Product
        </div>
      </Link>
      <Link to="/listProduct">
        <div className="link-container">
          <img src={list_product} alt="add" />
          List Product
        </div>
      </Link>
      <Link to="/orders">
        <div className="link-container">
          <div className="icon" style={{ fontSize: "25px", color: "gray" }}>
            {" "}
            <FaBoxOpen className="icon" />
          </div>
          Placed Orders
        </div>
      </Link>

      {superAdmin && (
        <Link to="/admin">
          <div className="link-container">
            <div
              className="icon"
              style={{ fontSize: "25px", color: "yellowgreen" }}
            >
              <RiUserSettingsFill className="icon" />
            </div>
            Admins
          </div>
        </Link>
      )}
    </div>
  );
}

export default Sidebar;

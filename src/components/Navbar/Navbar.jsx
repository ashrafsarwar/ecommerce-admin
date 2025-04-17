import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import nav_logo from "../../assets/nav-logo.svg";
import nav_profile from "../../assets/default.png";

function Navbar() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const admin = JSON.parse(localStorage.getItem("admin"));
  const superAdmin = admin?.email === "ashrafsarwar542@gmail.com";

  return (
    <>
      <div className="navbar">
        <img src={nav_logo} className="nav-logo" alt="nav" />
        <div className="profile-name">
          <div className="profile-icon" onClick={toggleModal}>
            <img
              src={admin?.image || nav_profile}
              className="nav-profile"
              alt="nav-profile"
            />
            <span className="admin-text">
              {admin ? admin.firstName : "Login"}
            </span>
            <span className="arrow-down">▼</span>
          </div>
        </div>
      </div>
      {modal && (
        <div className="nav-modal">
          <div className="nav-modal-content">
            {superAdmin && (
              <Link to="/admincreate">
                <p
                  style={{ textDecoration: "none" }}
                  onClick={() => setModal(false)}
                >
                  New Admin +
                </p>
              </Link>
            )}
            <p
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              {localStorage.getItem("auth-token") ? "Logout" : "Login"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

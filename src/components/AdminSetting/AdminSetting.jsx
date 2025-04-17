import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AdminContext } from "../Context/ContextApi";
import cross from "../../assets/cross_icon.png";
import profile from "../../assets/default.png";
import "./AdminSetting.css";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";

function AdminSetting() {
  const { admins } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [newAdmin, setNewAdmin] = useState([]);

  useEffect(() => {
    setNewAdmin([...admins]);
  }, [admins]);

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (adminToDelete) {
      const { email, image } = adminToDelete;
      try {
        const res = await axios.post(
          `http://localhost:3000/admins/removeadmin`,
          {
            email,
            filename: image,
          }
        );

        if (res.data.success) {
          // Filter out the deleted admin from newAdmin state
          setNewAdmin(newAdmin.filter((admin) => admin.email !== email));
          toast.success("Admin removed successfully", {
            duration: 3000,
          });
        } else {
          toast.error(
            "An error occurred while removing the admin. Please try again."
          );
        }
      } catch (err) {
        console.error("Error removing admin:", err);
        toast.error(
          "An error occurred while removing the admin. Please try again."
        );
      }
    }
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setAdminToDelete(null);
  };

  let localAdmin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="adminSettings">
      <h1>Organization's Admins</h1>
      <div className="adminSettings-lists">
        <p>Profile</p>
        <p>First Name</p>
        <p>Second Name</p>
        <p>Gmail</p>
        <p>Remove</p>
      </div>
      {newAdmin.length === 0 && <h1>No Admins Found</h1>}
      <div className="adminSettings-data">
        <hr />
        {newAdmin.map((admin) => (
          <React.Fragment key={admin._id}>
            <div className="adminSettings-main">
              <img src={admin.image || profile} alt="admin" className="image" />
              <p>{admin.firstName}</p>
              <p>{admin.lastName}</p>
              <p>{admin.email}</p>

              {admin.superAdmin &&
              admin.email === "ashrafsarwar542@gmail.com" ? (
                <p className="super">
                  {localAdmin.email === admin.email ? "You" : "Super Admin"}
                </p>
              ) : admin.superAdmin ? (
                localAdmin.email === admin.email ? (
                  <p className="super">You</p>
                ) : (
                  <img
                    src={cross}
                    alt="cross"
                    onClick={() => handleDeleteClick(admin)}
                    className="remove-icon"
                  />
                )
              ) : (
                admin.email !== "ashrafsarwar542@gmail.com" && (
                  <img
                    src={cross}
                    alt="cross"
                    onClick={() => handleDeleteClick(admin)}
                    className="remove-icon"
                  />
                )
              )}
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>

      <Modal
        text="Are you sure you want to delete this admin?"
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AdminSetting;

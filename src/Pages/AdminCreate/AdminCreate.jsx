import React, { useState } from "react";
import axios from "axios";
import "./AdminCreate.css";
import add_product from "../../assets/upload_area.svg"; // Assuming you have an image placeholder
import { useContext } from "react";
import { AdminContext } from "../../components/Context/ContextApi";
import toast from "react-hot-toast";

function AdminCreate() {
  const { admin } = useContext(AdminContext);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    superAdmin: "false", // Default value as string
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data for image upload
      const formDataWithFile = new FormData();
      formDataWithFile.append("upload", image);

      // Upload image
      const imageResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formDataWithFile,
      });
      const imageData = await imageResponse.json();

      if (imageData.success) {
        const formDataWithoutFile = { ...formData, image: imageData.imageUrl };

        const res = await axios.post(
          "http://localhost:3000/admins/signup",
          formDataWithoutFile
        );

        if (res.data.success) {
          toast.success("Admin Added Successfully", {
            duration: 3000,
          });

          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            superAdmin: "false",
          });
          setImage(null);
        } else {
          toast.error("Error uploading image. Please try again.");
        }
      } else {
        toast.error("Error uploading image. Please try again.");
      }
    } catch (error) {
      console.error("Error during admin creation:", error);
      toast.error("Error uploading image. Please try again.");
    }
  };

  return (
    <div className="admin-creation">
      <div className="admin-creation-container">
        <h1>Create Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="admin-creation-fields">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <div className="super-admin-option">
              <label htmlFor="superAdmin">
                Super Admin:
                <select
                  id="superAdmin"
                  name="superAdmin"
                  value={formData.superAdmin}
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </div>
            <div className="addProduct-fields">
              <p>Upload Image</p>
              <label htmlFor="file-upload" className="addProduct-file-upload">
                <img
                  src={image ? URL.createObjectURL(image) : add_product}
                  alt="add"
                  className="image-preview"
                />
              </label>
              <input
                id="file-upload"
                name="image"
                onChange={handleImage}
                type="file"
                hidden
              />
            </div>
          </div>
          <button type="submit">Create Admin</button>
        </form>
      </div>
    </div>
  );
}

export default AdminCreate;

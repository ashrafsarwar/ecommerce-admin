import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { AdminContext } from "../../components/Context/ContextApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Login() {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { superAdmin, setSuperAdmin } = useContext(AdminContext);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signin = async (e) => {
    e.preventDefault();
    if (isChecked) {
      try {
        const res = await axios.post(
          "http://localhost:3000/admins/signin",
          formData
        );
        if (res.data.success) {
          localStorage.setItem("auth-token", res.data.data.token);
          localStorage.setItem("super-admin", res.data.data.superAdmin);
          localStorage.setItem("admin", JSON.stringify(res.data.data.user));
          toast.success("Logged in successfully", {
            duration: 3000,
          });
          window.location.replace("/orders");
        } else {
          toast.error("Invalid email or password. Please try again.");
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        toast.error("An error occurred while signing in. Please try again.");
      }
    } else {
      toast.error("Please agree to the terms and privacy policy to continue.");
    }
  };
  return (
    <div className="loginlogout">
      <div className="login-container">
        <h1>Admin Log In</h1>
        <div className="login-fields">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button onClick={signin}>Continue</button>
        <div className="login-agree">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            aria-label="Agree to terms and privacy policy"
          />
          <p>
            I agree to the <span>Terms</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

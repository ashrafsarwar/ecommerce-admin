import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

export const AdminContextProvider = (props) => {
  const [admins, setAdmins] = useState([]);
  const [superAdmin, setSuperAdmin] = useState(
    JSON.parse(localStorage.getItem("super-admin")) || false
  );

  const fetchAdmins = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admins/getadmins"
      );
      if (response.data.success) {
        setAdmins(response.data.admins);
      } else {
        console.error("Error fetching admins:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    console.log("superAdmin state updated:", superAdmin);
  }, [superAdmin]);

  return (
    <AdminContext.Provider value={{ admins, superAdmin, setSuperAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};

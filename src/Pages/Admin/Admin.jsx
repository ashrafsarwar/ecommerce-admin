import React from "react";
import "./Admin.css";
import Sidebar from "../../components/SideBar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import AdminSetting from "../../components/AdminSetting/AdminSetting";
import Orders from "../../components/Orders/Orders";
import { useContext } from "react";
import { AdminContext } from "../../components/Context/ContextApi";
import AdminCreate from "../AdminCreate/AdminCreate";

function Admin() {
  const { superAdmin } = useContext(AdminContext);
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/listProduct" element={<ListProduct />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/admin" element={<AdminSetting />} />
        {superAdmin && (
          <>
            <Route path="/admincreate" element={<AdminCreate />}></Route>
          </>
        )}
      </Routes>
    </div>
  );
}

export default Admin;

import React, { useState } from "react";
import "./AddProduct.css";
import add_product from "../../assets/upload_area.svg";
import axios from "axios";
import toast from "react-hot-toast";

function AddProduct() {
  const [image, setImage] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
  });

  const handlChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    let imageResponse;
    let responseData;
    let product = productDetails;
    const formData = new FormData();
    formData.append("upload", image);

    await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => (imageResponse = data))
      .catch((error) => console.error("Error:", error));

    if (imageResponse.success) {
      product.image = imageResponse.imageUrl;
    }

    await axios
      .post("http://localhost:3000/products/addProduct", product)
      .then((res) => {
        responseData = res.data;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error");
      });

    if (responseData.success) {
      toast.success("Product Added Successfully");
      setProductDetails({
        name: "",
        old_price: "",
        new_price: "",
        category: "select",
      });
      setImage("");
    } else {
      toast.error(
        "An error occurred while adding the product. Please try again."
      );
    }
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className="addProduct">
      <div className="addProduct-fields">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handlChange}
          placeholder="Type Here..."
        />
      </div>
      <div className="addProduct-price">
        <div className="addProduct-fields">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            value={productDetails.old_price}
            onChange={handlChange}
            placeholder="Type Here..."
          />
        </div>
        <div className="addProduct-fields">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            value={productDetails.new_price}
            onChange={handlChange}
            placeholder="Type Here..."
          />
        </div>
      </div>
      <div className="addProduct-fields">
        <p>Category</p>
        <select
          name="category"
          value={productDetails.select}
          onChange={handlChange}
          className="addProduct-selector"
          defaultValue={"select"}
        >
          <option value="select" disabled>
            Select
          </option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addProduct-fields">
        <p>Upload Image</p>
        <label htmlFor="file-upload" className="addProduct-file-uploads">
          <img
            src={image ? URL.createObjectURL(image) : add_product}
            alt="add"
            value={productDetails.image}
            onChange={handlChange}
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
      <button className="addProduct-btn" onClick={() => Add_Product()}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;

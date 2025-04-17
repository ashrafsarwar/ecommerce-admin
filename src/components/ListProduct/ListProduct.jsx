import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross from "../../assets/cross_icon.png";
import axios from "axios";
import Modal from "../Modal/Modal";
import toast from "react-hot-toast";

function ListProduct() {
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products/getproduct");
      if (res.data.success) {
        setAllProducts(res.data.products);
        allProducts.reverse();
      } else {
        toast.error("An error occurred while fetching the products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("An error occurred while fetching the products.");
    }
  };

  const removeProduct = async () => {
    if (!productToDelete) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/products/removeproduct",
        {
          id: productToDelete.id,
          filename: productToDelete.image,
        }
      );

      if (res.data.success) {
        fetchAllProducts();
        setIsModalOpen(false);
        setProductToDelete(null);
        toast.success("Product removed successfully", {
          duration: 2000,
        });
      } else {
        toast.error(
          "An error occurred while removing the product. Please try again."
        );
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error(
        "An error occurred while removing the product. Please try again."
      );
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    fetchAllProducts(); // Fetch all products when the component mounts
  }, []);

  return (
    <div className="listProduct">
      <h1>All Product's List</h1>
      <div className="listProduct-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listProduct-products">
        <hr />
        {allProducts
          .slice()
          .reverse()
          .map((product, index) => (
            <React.Fragment key={index}>
              <div className="listProduct-main listProduct-product">
                <img src={product.image} alt="product" className="image" />
                <p>{product.name}</p>
                <p className="old-price">${product.old_price}</p>
                <p className="new-price">${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() =>
                    handleDeleteClick({ id: product.id, image: product.image })
                  }
                  src={cross}
                  alt="cross"
                  className="remove-icon"
                />
              </div>
              <hr />
            </React.Fragment>
          ))}
      </div>

      <Modal
        text="Are you sure you want to delete this product?"
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={removeProduct}
      />
    </div>
  );
}

export default ListProduct;

import React, { useState, useEffect } from "react";
import "./OrderModal.css";
import cross from "../../assets/cross_icon.png";
import toast from "react-hot-toast";

function OrderModal({ order, onClose }) {
  const [status, setStatus] = useState(
    order.isDelivered ? "Delivered" : "Pending"
  );
  const [newOrder, setNewOrder] = useState({});

  useEffect(() => {
    setNewOrder({ ...order });
  }, [order]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const updateStatus = async () => {
    const isDelivered = status === "Delivered" ? true : false;
    console.log(isDelivered);
    try {
      const response = await fetch("http://localhost:3000/orders/updateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({
          orderId: order._id,
          isDelivered,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Order status updated successfully");
        onClose();
      } else {
        toast.error(
          "An error occurred while updating the order status. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the order status. Please try again."
      );
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img
          className="close-button"
          onClick={onClose}
          src={cross}
          alt="cross"
        />
        <h2>Order Details</h2>
        <div className="order-info">
          <p>
            <strong>Order ID:</strong> {newOrder._id}
          </p>
          <p>
            <strong>Total Price:</strong> ${newOrder.totalPrice}
          </p>
          <p>
            <strong>Paid At:</strong>{" "}
            {new Date(newOrder.paidAt).toLocaleString()}
          </p>
          <h3>Shipping Address</h3>
          <p>
            <strong>Name:</strong> {newOrder.shippingAddress?.fullName}
          </p>
          <p>
            <strong>Address:</strong> {newOrder.shippingAddress?.address}
          </p>
          <p>
            <strong>Postal Address:</strong> {newOrder.shippingAddress?.city},{" "}
            {newOrder.shippingAddress?.postalCode}
          </p>
          <p>
            <strong>Country :</strong>
            {newOrder.shippingAddress?.country}
          </p>
        </div>
        <h3>Order Items</h3>
        <ul className="order-items">
          {newOrder.orderItems?.map((item, index) => (
            <li key={index} className="order-item">
              <img
                src={item.image}
                alt={item.nameProduct}
                className="item-image"
              />
              <div>
                <p>{item.nameProduct}</p>
                <p>
                  ${item.price} x {item.quantity}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="status-update">
          <label htmlFor="status-select">
            <strong>Order Status:</strong>
          </label>
          <select
            id="status-select"
            value={status}
            onChange={handleStatusChange}
            className="status-select"
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button className="update-button" onClick={updateStatus}>
          Update Status
        </button>
      </div>
    </div>
  );
}

export default OrderModal;

import React, { useContext, useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import "./Orders.css";
import OrderModal from "../OrderModal/OrderModal";
import toast from "react-hot-toast";

function Orders() {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to handle selected order
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlacedOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders/getOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();

      if (data.success) {
        setPlacedOrders(data.orders);
      } else {
        console.error("Error fetching orders:", data.message); // Handle errors from the server.
      }
    } catch (error) {
      console.error("Error fetching orders:", error); // Handle network or other errors.
    }
  };

  useEffect(() => {
    fetchPlacedOrders();
  }, []);

  const openModal = (order) => {
    setSelectedOrder(order); // Set the selected order
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    window.location.reload();
  };

  return (
    <div className="orderContainer">
      <h1>Orders</h1>
      <div className="orderListHeadings">
        <p>Box</p>
        <p>Order#</p>
        <p>Total</p>
        <p>Items No.</p>
        <p>Paid At</p>
        <p>Status</p>
      </div>
      <div className="ordersBox">
        {placedOrders
          .slice()
          .reverse()
          .map((order, index) => {
            return (
              <div
                className="orderList"
                key={order._id}
                onClick={() => openModal(order)} // Add onClick to open modal with the order details
              >
                <p>
                  <FaBoxOpen className="FaBoxOpen" />
                </p>
                <p>Order # {index + 1}</p>
                <p style={{ color: "gray", fontWeight: "bold" }}>
                  $ {order.totalPrice}
                </p>
                <p>{order.orderItems.length} x items</p>
                <p>{order.date}</p>
                <p>{new Date(order.paidAt).toLocaleDateString()}</p>
                <p
                  className={`statusLabel ${
                    order.isDelivered ? "delivered" : "pending"
                  }`}
                  style={{ color: order.isDelivered ? "green" : "#721c24" }}
                >
                  {order.isDelivered ? "Delivered" : "Pending..."}
                </p>
              </div>
            );
          })}
      </div>
      {isModalOpen && ( // Render modal only when it is open
        <OrderModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default Orders;

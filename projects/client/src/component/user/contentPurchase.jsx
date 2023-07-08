import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import moment from 'moment';

export default function MyPurchase() {
  const [purchases, setPurchases] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const token = useSelector((state) => state.auth.token);

  console.log(typeof startDate);
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
        console.log(startDate,endDate)
      const requestBody = {
        startDate: startDate,
        endDate: endDate
      };

      const response = await axios.post("http://localhost:8000/api/user/purchase", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPurchases(response.data.purchases);
    } catch (error) {
      console.error('Failed to get user purchases:', error);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="font-ysa">
      <h1 className="text-2xl font-bold text-darkgreen mb-4 text-center">Purchase History</h1>
      <div className="flex gap-3 pl-4">
      <div className="mb-4">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="mb-4">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>
      </div>
      {purchases.length > 0 ? (
        <div>
          <h3 className="text-lg font-bold text-darkgreen mb-2 pl-4">
            Purchase History between {moment(startDate).format("MMMM DD, YYYY")} and {moment(endDate).format("MMMM DD, YYYY")}
          </h3>
          {purchases.map((purchase, index) => (
            <div key={index} className="border p-4 rounded shadow mb-4">
              <h4 className="font-bold">Order #{purchase.orderDetail.id}</h4>
              <p>Total Price: {purchase.orderDetail.totalPrice}</p>
              <p>Address: {purchase.orderDetail.address}</p>
              <p>Order Date: {moment(purchase.orderDetail.createdAt).format("MMMM DD, YYYY")}</p>
              <hr />
              <h5 className="font-bold">Items:</h5>
              {purchase.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border p-2 rounded mb-2 flex gap-3">
                <img src={`http://localhost:8000${item.product.imgProduct}`} alt={item.product.name} className="h-24 w-24 object-cover" />
                <div className="grid grid-cols-1 gap-2">
                <p>Product: {item.product.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Category: {item.product.category}</p>
                </div>
                </div>
                ))}
            </div>
          ))}
        </div>
      ) : (
        <p className="pl-4">No purchase history found for the selected date range.</p>
      )}
    </div>
  );
}
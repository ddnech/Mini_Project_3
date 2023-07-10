import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";

export default function TopSelling() {
  const [topSelling, setTopSelling] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    setTopSelling([]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/top_selling",
        { categoryId: selectedCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      setTopSelling(response.data.data);
    } catch (error) {
      console.error('Failed to get top selling products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product/category");
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to get categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="font-ysa">
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      {topSelling.length > 0 ? (
        <div>
          {topSelling.map((product, index) => (
            <div key={index} className="border p-4 rounded shadow mb-4 flex gap-3">
              <img src={`http://localhost:8000${product.product.imgProduct}`} alt={product.product.name} className="h-24 w-24 object-cover" />
              <div className="grid grid-cols-1 gap-2 font-ysa">
                <p>Name: {product.product.name}</p>
                <p>Total Sold: {product.total_quantity}</p>
                <p>Price: Rp {Number(product.product.price).toLocaleString({ style: 'currency', currency: 'IDR' })}</p>
                <p>Category: {product.product.Category.name}</p>
                {/* <p>Description: {product.product.description}</p> */}
          
                <p>Stock: {product.product.stock}</p>
                <p>{product.product.isActive ? 'Active' : 'Deactive'}</p>
              </div>
              <div>
              <textarea
              className="w-70 h-30 p-4 border border-gray-300 bg-white text-lg resize-none font-josefin break-words"
              readOnly
              value={product.product.description}
            />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="pl-4">No top selling products found.</p>
      )}
    </div>
  );
}

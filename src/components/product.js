// components/Product.js
import React, { useState } from 'react';
import axios from 'axios';

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      const response = await axios.post(
        '/api/cart/add',
        { productId: product._id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('Product added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
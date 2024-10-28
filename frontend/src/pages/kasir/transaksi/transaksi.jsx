import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaShoppingCart, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Checkout from './fragments/checkout';

const KasirPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/menu', config);
      const data = response.data.data;

      // console.log(data);

      setMenuItems(data);
      const initialQuantities = {};
      data.forEach(item => {
        initialQuantities[item.id_menu] = 0;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      fetchItems();
    } else {
      try {
        const response = await axios.get(`http://localhost:8000/menu/search/${term}`, config);
        const data = response.data.data;
        setMenuItems(data);
        const newQuantities = {};
        data.forEach(item => {
          newQuantities[item.id_menu] = 0;
        });
        setQuantities(newQuantities);
      } catch (error) {
        console.error('Error searching menu items:', error);
      }
    }
  };

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };


  const addToCart = (menuItem) => {
    // Get the current quantity from the quantities state
    const qty = quantities[menuItem.id_menu];

    // If the quantity is 0, remove the item from the cart
    if (qty === 0) {
      const updatedCart = cartItems.filter((item) => item.id_menu !== menuItem.id_menu);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      // Recalculate the total amount
      const newTotal = updatedCart.reduce((total, item) => total + item.harga * item.quantity, 0);
      setTotalAmount(newTotal);

      // Hide the checkout section if the cart is empty
      setShowCheckout(updatedCart.length > 0);

      return;
    }

    // Proceed only if the quantity is greater than zero
    if (qty > 0) {
      // Check if the item is already in the cart
      const existingItem = cartItems.find((item) => item.id_menu === menuItem.id_menu);
      let updatedCart;

      if (existingItem) {
        // If the item already exists, update its quantity
        const updatedItem = {
          ...existingItem,
          quantity: qty,  // set the cart quantity to the updated qty directly
        };
        updatedCart = cartItems.map((item) =>
          item.id_menu === menuItem.id_menu ? updatedItem : item
        );
      } else {
        // If the item is not in the cart, add it with the current quantity
        updatedCart = [...cartItems, { ...menuItem, quantity: qty }];
      }

      // Update the cartItems state and localStorage
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));

      // Recalculate the total amount with the new quantity
      const newTotal = updatedCart.reduce((total, item) => total + item.harga * item.quantity, 0);
      setTotalAmount(newTotal);

      // Show the checkout section
      setShowCheckout(true);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-2/3 p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Transaksi</h1>

        <div className="flex mb-4">
          <div className="relative w-full md:w-1/3 ml-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
              placeholder="Search menu"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item.id_menu} className="bg-white rounded-lg p-4 shadow-md">
              <img
                src={`http://localhost:8000/menu/image/${item.gambar}`}
                alt={item.nama_menu}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold text-blue-700">{item.nama_menu}</h3>
              <p className="text-sm text-gray-600">{item.jenis}</p>
              <p className="text-gray-500 mb-2">{item.deskripsi}</p>
              <p className="text-blue-500 font-semibold">{`Rp ${item.harga}`}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <button onClick={() => decreaseQuantity(item.id_menu)} className="p-1 border rounded-full text-blue-500 hover:bg-blue-200">
                    <FaMinus />
                  </button>
                  <span className="mx-2">{quantities[item.id_menu]}</span>
                  <button onClick={() => increaseQuantity(item.id_menu)} className="p-1 border rounded-full text-blue-500 hover:bg-blue-200">
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-0 bg-blue-600 text-white py-1 px-3 rounded-lg flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCheckout && (
        <Checkout
          cartItems={cartItems}
        />
      )}
    </div>
  );
};

export default KasirPage;
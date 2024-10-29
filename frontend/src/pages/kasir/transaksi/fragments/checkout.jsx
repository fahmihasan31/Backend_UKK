import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, totalAmount = 0, setCartItems, setQuantities, setTotalAmount, setShowCheckout }) => {
  const [data, setData] = useState({
    nama_pelanggan: '',
  });
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]); // State to store available tables
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Fixed the string interpolation
    },
  };

  // Fetch tables on component mount
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8000/meja', config);
        console.log(response.data);
        setTables(response.data.data); // Assuming the response contains the tables
      } catch (error) {
        console.error('Error fetching tables', error);
      }
    };

    fetchTables();
  }, []);

  const handleCheckout = async () => {
    const id_user = localStorage.getItem('id_user');
    if (!selectedTable || !data.nama_pelanggan) {
      setErrorMessage("Masukkan nama dan pilih meja"); // Set error message
      return;
    }

    // Prepare the checkout body
    const checkoutBody = {
      id_user: id_user,
      id_meja: selectedTable,
      nama_pelanggan: data.nama_pelanggan,
      status: "belum_bayar",
      detailTransaksi: cartItems.map(item => ({
        id_menu: item.id_menu,
        qty: item.quantity,
        harga: item.harga,
      })),
    };

    // Log the checkout body for debugging
    console.log('Checkout Body:', checkoutBody);

    try {
      const response = await axios.post('http://localhost:8000/transaksi/add', checkoutBody, config);
      if (response.status === 200) {
        // Clear the cart and quantities on successful checkout
        setCartItems([]);
        setQuantities({});
        setTotalAmount(0);
        setShowCheckout(true);
      }
      setErrorMessage('');
      // Optional: Reset form or provide success feedback here
      setData({ nama_pelanggan: '' });
      setSelectedTable(null);
      // Optionally clear cartItems or redirect user
    } catch (error) {
      if (error.response) {
        console.error('Error during checkout', error.response.data);
        setErrorMessage(error.response.data.message || "Error during checkout. Please try again."); // Use error message from server if available
      } else {
        console.error('Error during checkout', error);
        setErrorMessage("Error during checkout. Please try again."); // Set error message on failure
      }
    }
  };

  return (

    <div className={`bg-white p-4 rounded-lg shadow-lg flex-grow mt-2 mr-2 ${cartItems.length === 0 ? 'min-h-screen' : 'min-h-screen'}`}>
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id_menu} className="border-b">
                <td className="py-2">{item.nama_menu}</td>
                <td className="py-2">{item.quantity}</td>
                <td className="py-2 text-blue-600 font-semibold">
                  Rp {(item.harga * (item.quantity || 1)).toLocaleString('id-ID')},00
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6 border-t pt-4">
        {cartItems.length > 0 && (
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-blue-600">
              Rp {totalAmount.toLocaleString('id-ID')},00
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Masukkan nama pelanggan"
          value={data.nama_pelanggan}
          onChange={(e) => setData({ ...data, nama_pelanggan: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-600"
        />
      </div>

      <div className="mt-4">
        <p className="font-semibold">Choose Table Number:</p>
        <div className="flex flex-wrap mt-2">
          {tables && tables.map((table) => (
            <button
              key={table.id_meja} // Assuming table has a unique id field
              onClick={() => setSelectedTable(table.id_meja)}
              className={`py-1 rounded-lg border ${selectedTable === table.id_meja ? 'bg-blue-600 text-white' : table.status === 'terisi' ? 'bg-blue-600 text-white opacity-50 ' : 'bg-gray-200'}`}
              style={{
                width: 'calc(20% - 0.5rem)', // Adjust width to fit 5 items in a row
                margin: '0.25rem' // Add some margin between buttons
              }}
            >
              {table.nomor_meja} {/* Assuming there is a field for table number */}
            </button>
          ))}
        </div>
      </div>


      {/* Display error message */}
      {errorMessage && (
        <div className="mt-4 text-red-600">
          {errorMessage}
        </div>
      )}

      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;

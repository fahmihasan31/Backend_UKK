import React, { useState } from 'react';
import axios from "axios";

const Checkout = ({ cartItems, totalAmount }) => {
  const [data, setData] = useState({
    nama_pelanggan: '',
  });
  const [selectedTable, setSelectedTable] = useState(null);
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleCheckout = async () => {
    const id_user = localStorage.getItem('id_user');
    if (!selectedTable || !customerName) {
      alert("Please enter customer name and select a table.");
      return;
    }
    try {
      const checkoutBody = {
        id_user: id_user,
        id_meja: selectedTable,
        nama_pelanggan: data.nama_pelanggan,
        status: "lunas",
        detailTransaksi: cartItems.map(item => ({
          id_menu: item.id_menu,
          qty: item.quantity,
          harga: item.harga,
        })),
      };

      const response = await axios.post('http://localhost:8000/transaksi/add', checkoutBody, config);
      console.log(response);
    } catch (error) {
      console.error('Error during checkout', error);
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg flex-grow ${cartItems.length === 0 ? 'min-h-32' : 'max-h-96 overflow-auto'}`}>
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
                <td className="py-2 text-green-600 font-semibold">
                  Rp {(item.harga * item.quantity).toLocaleString('id-ID')},00
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
            <span className="text-green-600">Rp {totalAmount.toLocaleString('id-ID')},00</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Masukkan nama pelanggan"
          value={data.nama_pelanggan}
          onChange={(e) => setData({ ...data, nama_pelanggan: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-green-600"
        />
      </div>

      <div className="mt-4">
        <p className="font-semibold">Pilih Nomor Meja:</p>
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((tableNumber) => (
            <button
              key={tableNumber}
              onClick={() => setSelectedTable(tableNumber)}
              className={`px-4 py-2 rounded-lg border ${selectedTable === tableNumber ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              {tableNumber}
            </button>
          ))}
        </div>
      </div>

      <button
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;

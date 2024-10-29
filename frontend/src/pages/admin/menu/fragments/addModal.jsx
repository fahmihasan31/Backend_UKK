import React, { useState } from 'react';
import axios from 'axios';

const AddMenuModal = ({ isOpen, onClose, fetchItems }) => {
  const [data, setData] = useState({
    nama_menu: '',
    jenis: '',
    harga: '',
    deskripsi: '',
    gambar: null,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const resetForm = () => {
    setData({
      nama_menu: '',
      jenis: '',
      harga: '',
      deskripsi: '',
      gambar: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await axios.post('http://localhost:8000/menu/add', data, config);
      fetchItems();
      resetForm();
      onClose();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error adding menu.');
      console.error('Error adding menu:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose} />
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Menu</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                onClose();
                resetForm(); 
              }}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nama_menu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Menu Name</label>
                <input
                  type="text"
                  id="nama_menu"
                  value={data.nama_menu}
                  onChange={(e) => setData({ ...data, nama_menu: e.target.value })}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Menu"
                />
              </div>
              <div>
                <label htmlFor="jenis" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                <select
                  id="jenis"
                  value={data.jenis}
                  onChange={(e) => setData({ ...data, jenis: e.target.value })}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select Menu</option>
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                </select>
              </div>
              <div>
                <label htmlFor="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input
                  type="number"
                  id="harga"
                  value={data.harga}
                  onChange={(e) => setData({ ...data, harga: e.target.value })}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="price"
                />
              </div>
              <div>
                <label htmlFor="gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
                <input
                  type="file"
                  id="gambar"
                  onChange={(e) => setData({ ...data, gambar: e.target.files[0] })}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea
                  id="deskripsi"
                  value={data.deskripsi}
                  onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Description"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-600 text-sm mt-2">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button type="button" onClick={onClose} className="mr-2 text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
                Cancel
              </button>
              <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
                Add Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;
import React, { useState } from 'react';
import axios from 'axios';
import buyIcon from '../../../../assets/image-bayar.jpg'; // Ganti dengan path gambar yang sesuai

const updateTransaksiModal = ({ isOpen, onClose, transaction }) => {
  if (!transaction) {
    return null;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async () => {
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await axios.put(
        `http://localhost:8000/transaksi/update/${transaction.id_transaksi}`,
        config
      );

      onClose(); // Close modal after successful deletion
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while deleting the user.');
      }
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-600 opacity-50" onClick={onClose} />
      <div className="relative p-6 w-full max-w-lg max-h-full">
        <div className="relative p-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-8">
          <div className="text-center">
            <img src={buyIcon} alt="Trash Icon" className="mx-auto mb-4 w-20 h-20" />
            <h3 className="mb-6 text-xl font-normal text-gray-900 dark:text-white">
              Are you sure you want to update this transaction?
            </h3>
            <div className="flex justify-center space-x-6">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default updateTransaksiModal;
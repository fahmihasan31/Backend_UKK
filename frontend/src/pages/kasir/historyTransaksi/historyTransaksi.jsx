import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaPrint } from 'react-icons/fa'; // Tambahkan FaPrint untuk ikon cetak
import CetakNotaModal from './fragments/cetakNotaModal';
import DeleteTransaksiModal from './fragments/deleteModal';
import EditTransaksiModal from './fragments/updateModal';
import axios from 'axios';

const HistoryTransaksiPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(5);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isCetakNotaModalOpen, setIsCetakNotaModalOpen] = useState(false); // Modal untuk Cetak Nota
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transaksi', config);
      const data = response.data.data;
      console.log(data);
      setTransactions(data);
      localStorage.setItem('transactions', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


  const handleSearch = async (term) => {
    try {
      if (term.trim() === '') {
        fetchTransactions();
        return;
      }
      const response = await axios.get(`http://localhost:8000/transaksi/search/${term}`, config);
      if (response.status !== 200) throw new Error('Network response was not ok');
      const data = response.data.data;
      setTransactions(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching transactions:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleCetakNota = (id) => {
    const transactionToPrint = transactions.find((transaction) => transaction.id_transaksi === id);
    setSelectedTransaction(transactionToPrint);
    setIsCetakNotaModalOpen(true); // Buka modal Cetak Nota
  };

  const handleEditTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id_transaksi === id);
    setSelectedTransaction(transactionToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    const transactionToDelete = transactions.find((transaction) => transaction.id_transaksi === id);
    setSelectedTransaction(transactionToDelete);
    setIsDeleteModalOpen(true);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                required
              />
            </div>
          </form>
        </div>
      </div>

      {/* Transactions Table */}
      <table className="min-w-full mt-4 bg-white dark:bg-gray-800">
        <thead>
          <tr className="w-full bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Transaction Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Customer Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction, index) => (
            <tr key={transaction.id_transaksi || index} className="border-b dark:border-gray-600">
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.tgl_transaksi}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.nama_pelanggan}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.status}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleCetakNota(transaction.id_transaksi)}
                  className="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-400"
                >
                  <FaPrint className="mr-2" />
                  Cetak Nota
                </button>
                <button
                  onClick={() => handleEditTransaction(transaction.id_transaksi)}
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <FaEdit className="mr-2" />
                  Update
                </button>
                <button
                  onClick={() => handleDeleteTransaction(transaction.id_transaksi)}
                  className="flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-400"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cetak Nota Modal */}
      {isCetakNotaModalOpen && (
        <CetakNotaModal
          transaction={selectedTransaction}
          isOpen={isCetakNotaModalOpen}
          onClose={() => setIsCetakNotaModalOpen(false)}
        />
      )}

      {/* Edit Transaction Modal */}
      {isEditModalOpen && (
        <EditTransaksiModal
          fetchTransactions={fetchTransactions}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}

      {/* Delete Transaction Modal */}
      {isDeleteModalOpen && (
        <DeleteTransaksiModal
          fetchTransactions={fetchTransactions}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="mr-2">Show</span>
          <select
            value={transactionsPerPage}
            onChange={(e) => {
              setTransactionsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-lg p-1"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
          <span className="ml-2">entries</span>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-3 py-1 mr-2"
          >
            Previous
          </button>
          <span className="text-gray-700">{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-3 py-1 ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaksiPage;



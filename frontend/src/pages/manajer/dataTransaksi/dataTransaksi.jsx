import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import DetailModal from './fragments/detailsModal'; // Import your modal component

const DataTransaksiPage = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(5);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchDataTransaksi = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transaksi', config);
      const data = response.data.data;
      setDataTransaksi(data);
      localStorage.setItem('transactions', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchDataTransaksi();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterDateChange = (e) => {
    setFilterDate(e.target.value);
    setCurrentPage(1);
  };

  // Filter transactions based on search term and date filter
  const filteredDataTransaksi = dataTransaksi.filter((transaction) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const matchesSearch =
      transaction.nama_pelanggan.toLowerCase().includes(lowerCaseTerm) ||
      transaction.user.nama_user?.toLowerCase().includes(lowerCaseTerm) ||
      transaction.status.toLowerCase().includes(lowerCaseTerm);

    const transactionDate = new Date(transaction.tgl_transaksi).toISOString().split('T')[0];
    const isDateMatch = !filterDate || transactionDate === filterDate;

    return matchesSearch && isDateMatch;
  });

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  const currentDataTransaksi = filteredDataTransaksi.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredDataTransaksi.length / transactionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4">
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

        <div>
          <label htmlFor="filter-date" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Filter Date</label>
          <input
            type="date"
            id="filter-date"
            value={filterDate}
            onChange={handleFilterDateChange}
            className="border rounded-lg p-1"
          />
        </div>
      </div>

      {/* Data Transaksi Table */}
      <table className="min-w-full mt-4 bg-white dark:bg-gray-800">
        <thead>
          <tr className="w-full bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Transaction</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Customer</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Cashier</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Table</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Total</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Status</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDataTransaksi.length > 0 ? (
            currentDataTransaksi.map((transaction, index) => (
              <tr key={transaction.id_transaksi || index} className="border-b dark:border-gray-600">
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.tgl_transaksi}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.nama_pelanggan}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.user.nama_user || 'N/A'}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.meja?.nomor_meja || 'N/A'}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.detail_transaksi.reduce((acc, item) => acc + item.harga, 0)}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{transaction.status}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                  <button
                    onClick={() => handleViewDetail(transaction)}
                    className="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none dark:focus:ring-green-400"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">No transactions found.</td>
            </tr>
          )}
        </tbody>
      </table>

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

      {/* Modal for Transaction Details */}
      {isDetailModalOpen && (
        <DetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default DataTransaksiPage;

import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddUserModal from './fragments/addModal';
import EditUserModal from './fragments/updateModal';
import DeleteUserModal from './fragments/deleteModal';
import axios from 'axios';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      setItems(data);
      localStorage.setItem('items', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = async (term) => {
    try {
      if (term.trim() === '') {
        fetchItems();
        return;
      }
      const response = await axios.get(`http://localhost:8000/menu/search/${term}`, config);
      if (response.status !== 200) throw new Error('Network response was not ok');
      const data = response.data.data;
      setItems(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id_menu === id);
    setSelectedItem(itemToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteItem = (id) => {
    const itemToDelete = items.find((item) => item.id_menu === id);
    setSelectedItem(itemToDelete);
    setIsDeleteModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        <button
          type="button"
          className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="h-3.5 w-3.5 mr-2" />
          Add Menu
        </button>
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

      {/* Items Table */}
      <table className="min-w-full mt-4 bg-white dark:bg-gray-800">
        <thead>
          <tr className="w-full bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Image</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Type</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Description</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id_menu || index} className="border-b dark:border-gray-600">
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                <img src={`http://localhost:8000/menu/image/${item.gambar}`} alt={item.nama_menu} className="w-12 h-12 object-cover" />
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.nama_menu}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.jenis}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.harga}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{item.deskripsi}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEditItem(item.id_menu)}
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <FaEdit className="mr-2" />
                  Update
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id_menu)}
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

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="mr-2">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
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

      {/* Modals */}
      <AddUserModal fetchItems={fetchItems} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {selectedItem && (
        <EditUserModal
          fetchItems={fetchItems}
          isOpen={isEditModalOpen}
          onClose={() => (
            setSelectedItem(null),
            setIsEditModalOpen(false)
          )}
          item={selectedItem}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteUserModal
          fetchItems={fetchItems}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default Menu;
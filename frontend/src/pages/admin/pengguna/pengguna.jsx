import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddUserModal from './fragments/tambah'; // Adjust the path if needed
import EditUserModal from './fragments/edit';

const Pengguna = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', username: 'johndoe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', username: 'janesmith', role: 'User' },
    { id: 3, name: 'Bob Johnson', username: 'bobjohnson', role: 'Manager' },
    { id: 4, name: 'Alice Davis', username: 'alicedavis', role: 'User' },
    { id: 5, name: 'Charlie Brown', username: 'charliebrown', role: 'Admin' },
    { id: 6, name: 'David Wilson', username: 'davidwilson', role: 'User' },
    { id: 7, name: 'Eva Green', username: 'evagreen', role: 'User' },
    { id: 8, name: 'Frank Knight', username: 'frankknight', role: 'Manager' },
    { id: 9, name: 'Grace Lee', username: 'gracelee', role: 'Admin' },
    { id: 10, name: 'Henry Ford', username: 'henryford', role: 'User' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5); // Default to 5 users per page
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (newUser) => {
    const newUserWithId = { ...newUser, id: users.length + 1 }; // Simple ID assignment
    setUsers([...users, newUserWithId]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const [selectedUser, setSelectedUser] = useState(null); // State untuk user yang sedang diedit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State untuk membuka modal edit

  const handleEditUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setSelectedUser(userToEdit);
    setIsEditModalOpen(true); // Buka modal edit
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };


  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        {/* Add User Button */}
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-start md:space-x-3 flex-shrink-0">
          <button
            type="button"
            className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => setIsModalOpen(true)} // Open the modal on click
          >
            <FaPlus className="h-3.5 w-3.5 mr-2" />
            Tambah Pengguna
          </button>
        </div>
        {/* Search Box */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
            </div>
          </form>
        </div>
      </div>

      {/* Users Table */}
      <table className="min-w-full mt-4 bg-white dark:bg-gray-800">
        <thead>
          <tr className="w-full bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Username</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Role</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id} className="border-b dark:border-gray-600">
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.username}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.role}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
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
            value={usersPerPage}
            onChange={(e) => {
              setUsersPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
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
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-2">{currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddUser={handleAddUser} />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditUser={handleUpdateUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Pengguna;
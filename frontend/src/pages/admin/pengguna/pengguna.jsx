import React, { useEffect, useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddUserModal from './fragments/addModal';
import EditUserModal from './fragments/updateModal';
import DeleteUserModal from './fragments/deleteModal';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users', config);
      const data = response.data.data;
      setUsers(data);
      localStorage.setItem('users', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = async (term) => {
    try {
      if (term.trim() === '') {
        fetchUsers();
        return;
      }
      const response = await axios.get(`http://localhost:8000/users/search/${term}`, config);
      if (response.status !== 200) throw new Error('Network response was not ok');
      const data = response.data.data;
      setUsers(data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleEditUser = (id) => {
    const userToEdit = users.find((user) => user.id_user === id);
    setSelectedUser(userToEdit);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    const userToDelete = users.find((user) => user.id_user === id);
    setSelectedUser(userToDelete);
    setIsDeleteModalOpen(true);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
        <button
          type="button"
          className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="h-3.5 w-3.5 mr-2" />
          Add User
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
          {currentUsers.map((user, index) => (
            <tr key={user.id || index} className="border-b dark:border-gray-600">
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.nama_user}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.username}</td>
              <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.role}</td>
              <td className="px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEditUser(user.id_user)}
                  className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  <FaEdit className="mr-2" />
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id_user)}
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

      {/* Add User Modal */}
      <AddUserModal fetchUsers={fetchUsers} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Edit User Modal */}
      {selectedUser && (
        <EditUserModal
          fetchUsers={fetchUsers}
          isOpen={isEditModalOpen}
          onClose={() => (
            setSelectedUser(null),
            setIsEditModalOpen(false)
          )
          }
          user={selectedUser}
        />
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && (
        <DeleteUserModal
          fetchUsers={fetchUsers} // Menyegarkan daftar pengguna
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default Users;
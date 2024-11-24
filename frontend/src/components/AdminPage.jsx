import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [employees, setEmployees] = useState([]); // Employee list state
  const [editingEmployeeId, setEditingEmployeeId] = useState(null); // Edit mode state
  const [editFormData, setEditFormData] = useState({}); // Form data for editing
  const [sortBy, setSortBy] = useState("name"); // Default sorting by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order
  const navigate = useNavigate();

  // Fetch employees from the API
  const fetchEmployees = async () => {
    const token = localStorage.getItem("token"); // Check for token
    if (!token) {
      alert("Unauthorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:4000/api/employee/fetch"
      );

      if (response.data && response.data.success) {
        setEmployees(response.data.data); // Update the employees state
      } else {
        alert(response.data.message || "Failed to fetch employee data.");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Error fetching employees. Please try again.");
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/employee/delete/${id}`
      );

      if (response.data.status) {
        alert(response.data.message);
        fetchEmployees(); // Refresh the employee list
      } else {
        alert("Error deleting employee.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error occurred while deleting. Please try again.");
    }
  };

  // Edit an employee
  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee._id);
    setEditFormData({ ...employee }); // Populate form with existing data
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/employee/edit/${editingEmployeeId}`,
        editFormData
      );

      if (response.data.status) {
        alert(response.data.message);
        setEditingEmployeeId(null); // Exit edit mode
        fetchEmployees(); // Refresh the list
      } else {
        alert("Error updating employee.");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error occurred while updating. Please try again.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login
  };

  // Sorting function
  const sortEmployees = (employees, sortBy, sortOrder) => {
    return [...employees].sort((a, b) => {
      if (sortBy === "name" || sortBy === "email") {
        const aValue = a[sortBy].toLowerCase();
        const bValue = b[sortBy].toLowerCase();
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (sortBy === "id") {
        return sortOrder === "asc"
          ? a._id.localeCompare(b._id)
          : b._id.localeCompare(a._id);
      } else if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-4xl mb-4">Employee List</h2>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => navigate("/add-employee")}
        >
          Add New Employee
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mb-4 ml-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Sorting Options */}
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="id">ID</option>
          <option value="date">Date</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {employees.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Mobile</th>
              <th className="border border-gray-300 px-4 py-2">Designation</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortEmployees(employees, sortBy, sortOrder).map(
              (employee, index) =>
                editingEmployeeId === employee._id ? (
                  <tr key={employee._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="mobile"
                        value={editFormData.mobile}
                        onChange={handleEditChange}
                        className="border border-gray-300 p-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="designation"
                        value={editFormData.designation}
                        onChange={handleEditChange}
                        className="border border-gray-300 p-1 rounded"
                      >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="gender"
                        value={editFormData.gender}
                        onChange={handleEditChange}
                        className="border border-gray-300 p-1 rounded"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="course"
                        value={editFormData.course}
                        onChange={handleEditChange}
                        className="border border-gray-300 p-1 rounded"
                      >
                        <option value="MCA">MCA</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingEmployeeId(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={employee._id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.mobile}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.designation}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.gender}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {employee.course}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEditClick(employee)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default AdminPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Logging data for debugging
      console.log("Data being sent:", data);

      const response = await axios.post(
        "http://localhost:4000/api/employee/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);

      if (response.data.status) {
        alert(response.data.message);
        navigate("/admin"); // Navigate back to Admin page after adding employee
      } else {
        alert(response.data.message || "Failed to add employee.");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(
        error.response?.data?.message || "Error occurred while adding employee."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Name", name: "name" },
            { label: "Email", name: "email" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                {field.label}:
              </label>
              <input
                type="text"
                name={field.name}
                value={data[field.name]}
                onChange={changeHandler}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          {/* Designation Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Designation:
            </label>
            <select
              name="designation"
              value={data.designation}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender Radio Buttons */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Gender:</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="M"
                  checked={data.gender === "M"}
                  onChange={changeHandler}
                  className="mr-2"
                />
                M
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={data.gender === "F"}
                  onChange={changeHandler}
                  className="mr-2"
                />
                F
              </label>
            </div>
          </div>

          {/* Course Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Course:</label>
            <select
              name="course"
              value={data.course}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>

          {/* Mobile Field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={data.mobile}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Image Field */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">Image URL:</label>
            <input
              type="text"
              name="image"
              value={data.image}
              onChange={changeHandler}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

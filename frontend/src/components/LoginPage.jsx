import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const newUrl = "http://localhost:4000/api/admin/login";

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        alert(response.data.message);
        navigate("/admin");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={onLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

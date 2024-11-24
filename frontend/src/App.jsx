import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/loginPage";
import AdminPage from "./components/AdminPage";
import AddEmployee from "./components/AddEmployee";


const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/add-employee" element={<PrivateRoute element={<AddEmployee />} />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;

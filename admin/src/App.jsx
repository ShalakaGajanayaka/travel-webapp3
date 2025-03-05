import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import NotFound from "./pages/notfound/NotFound";
import './App.css'
import AdminLayout from "./pages/admin/layout/AdminLayout";
import UserList from "./pages/admin/pages/UserList";
import AdminList from "./pages/admin/pages/AdminList";
import TieUser from "./pages/admin/pages/TieUser";
import UserTasks from "./pages/admin/pages/UserTasks";
import AddUser from "./pages/admin/pages/AddUser";
import AddAdmin from "./pages/admin/pages/AddAdmin";
import Withdrawels from "./pages/admin/pages/Withdrawels";
import SignUpPage from "./pages/auth/SignUpPage";
import Transactions from "./pages/admin/pages/Transactions";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin" element={<UserList />} />
            <Route path="/admin/add-user" element={<AddUser />} />
            <Route path="/admin/user-list" element={<UserList />} />
            <Route path="/admin/user-tie/:id" element={<TieUser />} />
            <Route path="/admin/user-tasks/:id" element={<UserTasks />} />
            <Route path="/admin/add-admin" element={<AddAdmin />} />
            <Route path="/admin/admin-list" element={<AdminList />} />
            <Route path="/admin/withdrawels/:id" element={<Withdrawels />} />
            <Route path="/admin/transactions/:id" element={<Transactions />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

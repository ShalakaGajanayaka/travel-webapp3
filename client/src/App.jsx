import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/landing/LandingPage";
import SignUpPage from "./pages/auth/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/auth/LoginPage";
import Profile from "./pages/User/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import TaskHistory from "./pages/tasks/TaskHistory";
import TaskList from "./pages/tasks/TaskList";
import NotFound from "./pages/notfound/NotFound";
import BlogOverview from "./pages/blog/BlogOverview";
import TaskOverview from "./components/tasks/TaskOverview";
import Earnings from "./pages/earnings/Earnings";
import Invites from "./pages/User/Invites";
import Example from "./components/UI/Example";
import About from "./pages/common/About";
import FAQ from "./pages/common/FAQ";
import Support from "./pages/common/Support";
import Terms from "./pages/common/Terms";
import ID from "./pages/User/ID";
import Withdrawal from "./pages/payment/Withdrawal";
import Deposit from "./pages/payment/Deposit";
import LinkWallet from "./pages/payment/LinkWallet";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<TaskHistory />} />
            <Route path="/invites" element={<Invites />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/blog-overview/:id" element={<BlogOverview />} />
            <Route path="/task-overview" element={<TaskOverview />} />

            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/tc" element={<Terms />} />
            <Route path="/empId" element={<ID />} />

            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/linkWallet" element={<LinkWallet />} />

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

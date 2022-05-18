import React from "react";

import Dashboard from "../components/Dashboard";
import Header from "../components/Navbar/Header";
import Footer from "../components/Footer"

function DashboardPage() {
  return (
    <div>
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default DashboardPage;
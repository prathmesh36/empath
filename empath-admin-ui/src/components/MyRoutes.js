import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Client from "./nav-bar-items/Client";
import Experience from "./nav-bar-items/Experience";
import Order from "./nav-bar-items/Order";
import Users from "./nav-bar-items/Users";

const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/experience" element={<Experience />} />
      <Route path="/client" element={<Client />} />
      <Route path="/order" element={<Order />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </BrowserRouter>
);

export default MyRoutes;

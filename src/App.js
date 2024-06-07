// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./container/Home";
import CryptoChart from "./container/CryptoChart";
import Navbar from "./container/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/crypto" element={<CryptoChart />} />
      </Routes>
    </div>
  );
}

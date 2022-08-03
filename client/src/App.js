import React from "react";

import NavBar from "./components/NavBar/NavBar.js";
import { Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer/Footer.js";
import Detail from "./components/BookDetail/Detail.js";
import './app.css'


function App() {

  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/:id" element={<Detail/>} />
          {/* <Route path="/" element={} />
          <Route path="/" element={} />
          <Route path="/" element={} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

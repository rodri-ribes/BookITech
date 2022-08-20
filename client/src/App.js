import React from "react";
import NavBar from "./components/NavBar/NavBar.js";
import { Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer/Footer.js";
import './app.css'
import Home from "./components/Home/Home.js";
import Detail from "./components/BookDetail/Detail"
import SignIn from './components/SignIn/SignIn.js'
import SignUp from './components/SignUp/SignUp.js'
import Favorite from "./components/Favorites/Favorite";
import { AuthContextProvider } from "./firebase/AuthContext.js";
import Profile from "./components/Profile/Profile.js";
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { Card404 } from "./components/404/Card404.js";
import ResponsiveDrawer from "./components/Filters/FiltersSidebar.js";

function App() {

  return (
    <div className="container1">
      <AuthContextProvider>
        <NavBar />
        {/* <ResponsiveDrawer /> */}
        <div className="container">
          <Routes>
            <Route path="/book/:id" element={<Detail />} />
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path="*" element={<Card404 />} />
          </Routes>
        </div>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;

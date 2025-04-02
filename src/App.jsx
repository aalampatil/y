import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]); 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      ) : (
        <>
          <Header />
          <main className="flex-1 container mx-auto p-4">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

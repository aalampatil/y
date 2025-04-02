import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { Container } from "./index";

function MyAccount() {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const user = await authService.getCurrentUser(); // Added 'await'
        if (user) {
          setDetails(user);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    fetchDetails();
  }, []);

  return (
    <Container className="max-w-lg mx-auto py-10">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : details ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">My Account</h2>
          <p className="mt-4 text-lg text-gray-600">👤 {details.name}</p>
          <p className="text-gray-500">✉️ {details.email}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No account details found.</p>
      )}
    </Container>
  );
}

export default MyAccount;

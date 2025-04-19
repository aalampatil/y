import React, { useState } from "react";
import { Input, Button } from "./index";
import authService from "../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
//import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
//import { useDispatch } from "react-redux";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const user = await authService.createAccount(data);
      if (user) {
        await authService.verifyEmail();
        navigate("/verify-email");
        console.log("Account created and verification email sent", user);
      }
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Sign up to create an account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Have an account?
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL, setUser } from "../utils/helpers";
import axios from "axios";

export default function Login({ setUserInformation }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateData() {
    let isValid = true;
    setPasswordError("");
    setUsernameError("");
    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    }
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    }
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateData()) {
      toast.dismiss();
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `${API_URL}/auth/token`,
          `username=${username}&password=${password}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setUserInformation(data);
        setUser(data);
        setIsLoading(false);
        setPassword("");
        setUsername("");
        setPasswordError("");
        setUsernameError("");
        toast.success("Successfully logged in! 🎉");
        navigate("/");
      } catch (err) {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
        let toast_message =
          "An error occurred. Please check your internet connection";
        if (err.response) {
          if (err.response.status === 401) {
            toast_message = err.response.data.detail;
          } else {
            toast_message = "An error occurred. Please try again later";
          }
        }
        setTimeout(() => {
          toast.error(toast_message);
          setIsLoading(false);
        }, 3000);
      }
    }
  }

  return (
    <main className="bg-gray-100 flex items-center justify-center py-16 min-h-screen">
      <div className="flex justify-center px-6 w-full">
        <div className="bg-white px-6 py-8 w-full shadow-2xl md:w-1/2 xl:w-1/3 rounded-2xl md:rounded-r-none">
          <div className="w-full flex justify-center mb-4">
            <img src="./logo.png" alt="logo" className="h-32" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <p className="text-center font-medium text-2xl">
              {"Please login to your account"}
            </p>

            <div className="space-y-2 flex flex-col">
              <label className="font-medium" htmlFor="username">
                {"Username"}
              </label>
              <input
                type="text"
                id="username"
                autoComplete="username"
                className={`border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition duration-200 w-full ${
                  usernameError && "border-red-600 focus:border-red-600"
                }`}
                placeholder={"Username"}
                onChange={({ target }) => {
                  setUsername(target.value.trim());
                  setUsernameError("");
                }}
                value={username}
              />
              {usernameError && <p className="text-red-600">{usernameError}</p>}
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="font-medium" htmlFor="password">
                {"Password"}
              </label>
              <input
                type="password"
                id="password"
                className={`border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500 transition duration-200 w-full ${
                  passwordError && "border-red-600 focus:border-red-600"
                }`}
                placeholder={"Password"}
                onChange={({ target }) => {
                  setPassword(target.value);
                  setPasswordError("");
                }}
                value={password}
              />
              <div>
                <Link
                  className="text-sm hover:underline text-blue-500 hover:scale-105 duration-200 "
                  to="/forgot_password">
                  {"Forgot password?"}
                </Link>
              </div>
              {passwordError && <p className="text-red-600">{passwordError}</p>}
            </div>

            <button
              className={`bg-blue-500 text-white font-bold py-3 px-4 rounded-lg flex mx-auto justify-center w-1/2 hover:bg-blue-600 duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}>
              {isLoading ? (
                <img src="./loader.svg" alt="loader" className="h-6 w-6" />
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
        <div className="hidden md:flex w-1/2 xl:w-1/3 bg-black/80 rounded-r-2xl flex-col justify-center space-y-8 px-8 shadow-2xl">
          <h4 className="text-4xl font-bold text-center text-white">
            {"A complete to-do app for your daily tasks"}
          </h4>
          <p className="text-xl font-light text-center text-balance text-white">
            {"Easily manage your tasks, projects, and more. Join us now! 🚀"}
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      if (res.status === 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup Page</h1>
      <hr />
      <label htmlFor="username">
        Username
        <br />
        <input
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser((p) => ({ ...p, username: e.target.value }))}
          placeholder="username"
        />
      </label>
      <label htmlFor="email">
        Email
        <br />
        <input
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))}
          placeholder="email"
        />
      </label>
      <label htmlFor="password">
        Password
        <br />
        <input
          className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser((p) => ({ ...p, password: e.target.value }))}
          placeholder="password"
        />
      </label>
      <button
        className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={onSignup}
      >
        Signup
      </button>
      <Link href="/login">Login</Link>
    </div>
  );
};

export default SignupPage;

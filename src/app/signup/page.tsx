"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const SignupPage = () => {
  const session = useSession();

  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignup = async () => {
    try {
      const res = await axios.post("/api/auth/signup", user);
      if (res.status === 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center min-h-screen p-4 gap-10">
      <div className="left flex-1 h-full bg-amber-600 shadow-lg rounded-xl"></div>
      <div className="right  flex-1 h-full flex flex-col items-center justify-center">
        <div className="card-cntainer flex flex-col items-center justify-around w-3/4 border-2 border-slate-100 shadow-lg rounded-xl py-4 px-12">
          <h1 className="text-3xl pb-4">Signup</h1>
          <div className="google-signup w-full border-y py-4 border-slate-200">
            <button
              className="w-full flex items-center justify-center border border-slate-100 gap-4 bg-white p-2 shadow-lg rounded-lg"
              onClick={() => signIn("google")}
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="logo"
                width={24}
                height={24}
              />
              Sign in with Google
            </button>
          </div>
          <div className="card-input w-full py-4 flex flex-col gap-4">
            <label htmlFor="username" className="w-full flex flex-col gap-2">
              <span>Username</span>
              <input
                className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) =>
                  setUser((p) => ({ ...p, username: e.target.value }))
                }
                placeholder="username"
              />
            </label>
            <label htmlFor="email" className="w-full flex flex-col gap-2">
              Email
              <br />
              <input
                className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) =>
                  setUser((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="email"
              />
            </label>
            <label htmlFor="password" className="w-full flex flex-col gap-2">
              Password
              <br />
              <input
                className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) =>
                  setUser((p) => ({ ...p, password: e.target.value }))
                }
                placeholder="password"
              />
            </label>
          </div>
          <div className="btns">
            <button
              className="mt-2 text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-600 dark:focus:ring-amber-700"
              onClick={onSignup}
            >
              Signup
            </button>
          </div>
          <div className="links mt-4">
            <span>Already have an account? </span>
            <Link className="underline text-amber-600" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

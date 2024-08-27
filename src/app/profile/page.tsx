"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [gotData, setGotData] = useState(false);

  const onLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    try {
      let res = await axios.get("/api/users/getDetails");
      setUser(res.data.data);
      setGotData(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!gotData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="loader"></div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile Page</h1>
        <br />
        <h2>Hi {user?.username!} </h2>
        <br />
        <button
          onClick={onLogout}
          className="py-2 px-4 bg-blue-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    );
  }
};

export default ProfilePage;

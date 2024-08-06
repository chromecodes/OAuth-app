"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <br />
      <button
        onClick={onLogout}
        className="py-2 px-4 bg-blue-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;

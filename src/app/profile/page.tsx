"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();

  const [data, setData] = useState("");

  const getUserDetail = async () => {
    try {
      const responseData = await axios.get("/api/users/me");
      setData(responseData.data.data._id);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout success.");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile page</h1>
      <hr />
      {data ? (
        <Link href={`/profile/${data}`}>{data}</Link>
      ) : (
        "No data to display"
      )}
      <hr />
      <button
        className="mt-4 cursor-pointer py-2 px-4  bg-blue-400 hover:bg-blue-600 rounded-lg mb-4 focus:outline-none focus:bg-blue-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;

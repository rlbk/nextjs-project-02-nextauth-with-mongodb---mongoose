"use client";

import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisable, setBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error("Login failed");
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) setBtnDisable(false);
    else setBtnDisable(true);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />
      <label>Username</label>
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        className="text-black mb-3"
        onChange={inputChangeHandler}
      />{" "}
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={user.password}
        className="text-black mb-4"
        onChange={inputChangeHandler}
      />
      <button
        onClick={onLogin}
        disabled={btnDisable || loading}
        className="cursor-pointer p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Login
      </button>
      <Link href={"/siginup"}>Visit signup page</Link>
    </div>
  );
};

export default LoginPage;

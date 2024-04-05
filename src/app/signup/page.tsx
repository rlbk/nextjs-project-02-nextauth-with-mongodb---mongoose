"use client";

import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [btnDisable, setBtnDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success");
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error("Signup failed");
    }
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    )
      setBtnDisable(false);
    else setBtnDisable(true);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Sign Up"}</h1>
      <hr />
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.username}
        className="text-black mb-3"
        onChange={inputChangeHandler}
      />{" "}
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
        onClick={onSignUp}
        disabled={btnDisable || loading}
        className="cursor-pointer p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Signup
      </button>
      <Link href={"/login"}>Visit login page</Link>
    </div>
  );
};

export default SignupPage;

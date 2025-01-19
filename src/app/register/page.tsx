"use client"
import React, {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Register = () => {

  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if(!isValidEmail(email)){
      setError("this email is invalid!");
      return;
    }

    if(!password || password.lenght < 8){
      setError("invalid password!");
      return;
    }

    try{
      const res = await fetch("/api/register",{
        method: "POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      if(res.status === 400){
        setError("this email is already registered!");
      }if(res.status === 200){
        setError("");
        router.push("/login");
      }
    }catch(error){
      setError("Error, try again...");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black bg-white"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black bg-white"
            placeholder="password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <h2 className="text-center text-gray-500 mt-4">or</h2>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default Register;

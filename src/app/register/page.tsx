"use client"
import {useState} from "react";
import Link from "next/link";

const Register = () => {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass]= useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Extract email and password from the form elements
    const form = e.currentTarget;
    const email = (form[0] as HTMLInputElement).value;
    const password = (form[1] as HTMLInputElement).value;
  
    // Validate email
    if (!isValidEmail(email)) {
      setError("This email is invalid!");
      return;
    }
  
    // Validate password
    if (!password || password.length < 8) {
      setError("Invalid password! Password must be at least 8 characters.");
      return;
    }
  
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (res.status === 400) {
        setError("This email is already registered!");
      } else if (res.status === 200) {
        setError("");
        // router.push("/login");
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (error) {
      setError("Error, try again...");
      console.error(error);
    }

    // try {
    //   // Log the data to the console
    //   console.log("Email:", email);
    //   console.log("Password:", password);
    
    //   // Simulate a successful response
    //   setError(""); // Clear any previous error messages
    
    //   // Uncomment the line below if you want to simulate redirection after a successful registration
    //   // router.push("/login");
    // } catch (error) {
    //   setError("Error, try again...");
    //   console.error(error);
    // }
    
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email
            }
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black bg-white"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:border-blue-400 focus:text-black bg-white"
            placeholder="password"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
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
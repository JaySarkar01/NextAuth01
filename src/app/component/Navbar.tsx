// "use client"
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="m-10 bg-[#212121] rounded py-5 px-5 shadow-md">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/">Home</Link>
        </li>
        <div className="flex gap-10">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

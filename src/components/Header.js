import React from "react";
import logo from "./discord_logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const Signin = (e) => {
    e.preventDefault();

    auth
      .signInWithPopup(provider)
      .then(() => navigate("/channels"))
      .catch((error) => alert(error.message));
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
      <a href="/">
        <img src={logo} className="w-32 h-12 object-contain" alt="" />
      </a>
      <div className="hidden lg:flex space-x-6 text-white ">
        <a href="/" className="link">
          Download
        </a>
        <a href="/" className="link">
          Nitro
        </a>
        <a href="/" className="link">
          Safety
        </a>
        <a href="/" className="link">
          Support
        </a>
        <a href="/" className="link">
          Blog
        </a>
        <a href="/" className="link">
          Careers
        </a>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          onClick={!user ? Signin : () => navigate("/channels")}
        >
          {!user ? "Signin" : "Open Discord"}
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-9 text-white cursor-pointer lg:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </header>
  );
}

export default Header;

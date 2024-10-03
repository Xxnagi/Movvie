"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUserAvatar(userData.avatar.tmdb.avatar_path);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full p-5 flex justify-center items-center z-50 bg-black/30 backdrop-blur-md border-b border-gray-600">
      <nav className="flex w-full justify-between max-w-screen-2xl items-center">
        <Link href={"/"}>
          <h1 className="font-bold text-2xl text-white">Movvie</h1>
        </Link>

        {/* <div className="flex-1 flex justify-center">
          <div className="flex p-3 rounded-full backdrop-blur bg-slate-500/70 justify-center max-sm:hidden">
           
          </div>
        </div> */}

        <div className="flex max-sm:justify-end">
          {isLoggedIn ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/original${userAvatar}`}
                alt="User Avatar"
                sizes="100px"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Link href="/login">
              <button className="text-white">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { navLists } from "../../constants/type";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full p-5 flex justify-center items-center z-50 bg-black/30 backdrop-blur-md border-b border-gray-600">
        <nav className="flex w-full max-w-screen-2xl items-center">
          <Link href={"/"}>
            <h1 className="font-bold text-2xl text-white">Movvie</h1>
          </Link>

          <div className="flex-1 flex justify-center">
            <div className="flex p-3 rounded-full backdrop-blur bg-slate-500/70 justify-center max-sm:hidden">
              {navLists.map((nav, i) => (
                <div
                  key={i}
                  className="px-5 text-sm cursor-pointer text-white hover:text-black transition-all"
                >
                  {nav}
                </div>
              ))}
            </div>
          </div>

          <div className="flex max-sm:justify-end">
            <Image src={"/search.svg"} alt="Search" width={18} height={18} />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;

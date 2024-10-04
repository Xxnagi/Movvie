"use client";

import { useNavbar } from "@/hooks/useNavbar";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/useLogout";

const Navbar = () => {
  const { isLoggedIn, userAvatar } = useNavbar();
  const handleLogout = useLogout();

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${userAvatar}`}
                    alt="User Avatar"
                    sizes="100px"
                    fill
                    className="object-cover"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

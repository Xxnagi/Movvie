"use client";
import { getAccountDetails } from "@/app/api/auth";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const useNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const sessionId = Cookies.get("tmdb_session_id");

      if (sessionId) {
        setIsLoggedIn(true);

        const fetchUserAvatar = async () => {
          try {
            const accountData = await getAccountDetails(sessionId);
            console.log("Account Data:", accountData); // Debugging log

            if (accountData && accountData.avatar) {
              setUserAvatar(accountData.avatar.tmdb.avatar_path);
            }
          } catch (error) {
            console.error("Error fetching account details:", error);
            setIsLoggedIn(false);
          }
        };

        fetchUserAvatar();
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return { isLoggedIn, userAvatar, setIsLoggedIn };
};

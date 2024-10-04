// hooks/useLogout.js
import { useCallback } from "react";

const useLogout = () => {
  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Refresh the page

          window.location.reload();
        } else {
          console.error("Logout failed");
          // Optionally show an error message to the user here
        }
      } else {
        throw new Error("Logout request failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show an error message to the user here
    }
  }, []);

  return handleLogout;
};

export default useLogout;

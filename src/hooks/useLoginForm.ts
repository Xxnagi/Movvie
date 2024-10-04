"use client";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { loginAndCreateSession } from "@/app/api/auth";
import Cookies from "js-cookie"; // Import js-cookie

export const useLoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the login and session creation helper method
      const sessionData = await loginAndCreateSession(
        values.username,
        values.password
      );

      if (!sessionData || !sessionData.session_id) {
        throw new Error("Login failed. Could not create session.");
      }

      // Set the session ID cookie
      Cookies.set("tmdb_session_id", sessionData.session_id, { expires: 7 }); // Set to expire in 7 days

      // Redirect to dashboard or home page after successful login
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, error, isLoading };
};

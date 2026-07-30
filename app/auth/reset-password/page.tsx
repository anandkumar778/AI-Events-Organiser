"use client";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { useState } from "react";

export default function ResetPasswordPage() {

  const { token } =
    useParams();

  const router =
    useRouter();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        const response =
          await fetch(
            `http://localhost:8000/api/auth/reset-password/${token}`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                password,
              }),
            }
          );

        const data =
          await response.json();

        alert(
          data.message
        );

        router.push(
          "/login"
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={
              confirmPassword
            }
            onChange={(e)=>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
}
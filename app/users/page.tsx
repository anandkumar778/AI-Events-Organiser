"use client";

import { useEffect, useState, useCallback } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/users"
      );

      const data = await response.json();

      console.log(data);

      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">
          Users List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="p-3 border">
                    {index + 1}
                  </td>

                  <td className="p-3 border">
                    {user.name}
                  </td>

                  <td className="p-3 border">
                    {user.email}
                  </td>

                  <td className="p-3 border">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"use client"; // Required for hooks in Next.js

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); // Ensures fresh data
        setUser({
          name: currentUser.displayName || "User Name",
          email: currentUser.email || "user@example.com",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EFEFEF]">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Profile</h2>
        <div className="mt-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center text-3xl font-semibold text-gray-600">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
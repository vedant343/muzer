"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();
  return (
    <div className="bg-gray-800 p-4 text-white">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Muzi</div>
        <div>
          {/* user is logged in */}
          {session.data?.user && (
            <button
              className="m-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              onClick={() => signOut()}
            >
              Logout
            </button>
          )}
          {/* user is not properly logged in */}
          {!session.data?.user && (
            <button
              className="m-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

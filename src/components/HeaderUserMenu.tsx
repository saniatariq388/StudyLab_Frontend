"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, ShieldCheck } from "lucide-react";
import { logoutUser } from "../services/logout";
import { CurrentUser } from "../interface/user";

export default function HeaderUserMenu({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div className="text-left text-sm">
          <p className="font-medium text-gray-900 leading-tight">{user.username}</p>
          <p className="text-xs text-gray-500 leading-tight">{user.email}</p>
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
          <div className="mb-2 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
            <ShieldCheck size={14} />
            Authorized
          </div>
          <p className="mb-1 px-1 text-sm font-medium text-gray-900">{user.username}</p>
          <p className="mb-3 px-1 text-xs text-gray-500">{user.email}</p>
          <button
            onClick={() => logoutUser()}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
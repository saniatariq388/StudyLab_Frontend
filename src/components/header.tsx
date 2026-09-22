import Link from "next/link";
import { Bell, Plus } from "lucide-react";
import { getSessionStatus } from "../services/session";
import { getCurrentUser } from "../services/user";
import HeaderUserMenu from "./HeaderUserMenu";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const { isAuthenticated } = await getSessionStatus();
  const user = isAuthenticated ? await getCurrentUser().catch(() => null) : null;

  return (
    <header className="relative flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
          F
        </div>
        <span className="text-lg font-semibold text-gray-900">StudyLab</span>
      </div>

      <HeaderNav />

      <div className="flex items-center gap-4">
        <Link
          href="/create-session"
          className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={16} />
          Create Session
        </Link>

        <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-50">
          <Bell size={20} />
        </button>

        <HeaderUserMenu user={user} />
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Library", href: "/library" },
  { label: "Folders", href: "/folders" },
  { label: "Analytics", href: "/analytics" },
];

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 rounded-full bg-gray-50 p-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            pathname === item.href ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
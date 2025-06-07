"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/src/data/navLinks";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center py-2 px-4 mt-4 rounded-2xl bg-white border border-gray-100 shadow-lg w-[85%] mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img
              className="w-[180px]"
              src="/images/Graphic & Text (Color & Black).png"
              alt="Sahayata Logo"
            />
          </Link>

          <div className="flex-1 flex justify-center">
            <ul className="flex items-center gap-5 text-lg">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className={`cursor-pointer nav-link${
                    pathname === link.href ? " nav-link-active" : ""
                  }`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/volunteer">
            <button className="btn-secondary text-white">
              Become Volunteer
            </button>
          </Link>
          <Link href="/donate">
            <button className="btn-primary">Donate</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

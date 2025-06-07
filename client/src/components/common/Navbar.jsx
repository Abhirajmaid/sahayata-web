"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/src/data/navLinks";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center py-2 px-4 mt-4 rounded-2xl bg-white border border-gray-100 shadow-lg w-[95%] md:w-[85%] mx-auto">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-2">
            <img
              className="w-[140px] md:w-[180px]"
              src="/images/Graphic & Text (Color & Black).png"
              alt="Sahayata Logo"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/volunteer">
            <button className="btn-secondary text-white">
              Become Volunteer
            </button>
          </Link>
          <Link href="/donate">
            <button className="btn-primary">Donate</button>
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-brand-light"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col md:hidden">
          <div className="bg-white rounded-b-2xl shadow-lg w-full max-w-xs ml-auto h-full flex flex-col py-6 px-6 gap-8 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <img
                  className="w-[120px]"
                  src="/images/Graphic & Text (Color & Black).png"
                  alt="Sahayata Logo"
                />
              </Link>
              <button
                className="p-2 rounded-lg hover:bg-brand-light"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <ul className="flex flex-col gap-4 text-lg">
              {navLinks.map((link) => (
                <li
                  key={link.href}
                  className={`cursor-pointer nav-link${
                    pathname === link.href ? " nav-link-active" : ""
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 mt-8">
              <Link href="/volunteer" onClick={() => setMobileOpen(false)}>
                <button className="btn-secondary text-white w-full">
                  Become Volunteer
                </button>
              </Link>
              <Link href="/donate" onClick={() => setMobileOpen(false)}>
                <button className="btn-primary w-full">Donate</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default Navbar;

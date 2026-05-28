"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: "/dashboard/jobs", label: "Jobs" },
    { href: "/how-it-works", label: "How it Works" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 top-0 left-0 border-b border-slate-100 shadow-xs transition-all">
      <div className="flex justify-between items-center px-6 md:px-8 py-5 max-w-7xl mx-auto">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors"
        >
          HireLink
        </Link>

        {/* Desktop Links */}
        <div className="space-x-8 hidden md:flex font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-600 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA / Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="hidden sm:inline-block bg-slate-900 hover:bg-indigo-600 transition-colors text-white px-5 py-2.5 rounded-xl font-medium shadow-xs text-sm"
          >
            Sign Up
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all border border-slate-100"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-lg overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-800 font-semibold text-base py-2 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-4 mt-2 flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center border border-slate-200 text-slate-800 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

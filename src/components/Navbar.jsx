'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          Care<span className="text-gray-900">.xyz</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">

          <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">
            Services
          </Link>

          {session && (
            <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 transition">
              My Bookings
            </Link>
          )}

          {session?.user?.role === 'admin' && (
            <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 transition">
              Admin
            </Link>
          )}

          {session ? (
            <>
              <span className="text-sm text-gray-500">
                Hi, {session.user.name}
              </span>

              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4 shadow-sm">

          <Link href="/services" onClick={() => setMenuOpen(false)} className="block">
            Services
          </Link>

          {session && (
            <Link href="/my-bookings" onClick={() => setMenuOpen(false)} className="block">
              My Bookings
            </Link>
          )}

          {session?.user?.role === 'admin' && (
            <Link href="/admin/dashboard" onClick={() => setMenuOpen(false)} className="block">
              Admin
            </Link>
          )}

          {session ? (
            <>
              <p className="text-sm text-gray-500">
                Logged in as {session.user.name}
              </p>
              <button
                onClick={() => signOut()}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block">
                Login
              </Link>
              <Link href="/register" className="block">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

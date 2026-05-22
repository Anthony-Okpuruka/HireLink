import React from 'react'
import Link from 'next/link'

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-5 text-slate-800 shadow-sm border-b border-slate-100 fixed w-full bg-white/80 backdrop-blur-md z-50 top-0 left-0 transition-all">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors">
                HireLink
            </Link>

            <div className="space-x-8 hidden md:flex font-medium text-slate-600">
                <Link href="/dashboard/jobs" className="hover:text-indigo-600 transition-colors">Jobs</Link>
                <Link href="/companies" className="hover:text-indigo-600 transition-colors">Companies</Link>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">About</Link>
            </div>

            <Link href="/register" className="bg-slate-900 hover:bg-indigo-600 transition-colors text-white px-6 py-2.5 rounded-xl font-medium shadow-sm">
                Sign Up
            </Link>
        </nav>
    )
}

export default Navbar

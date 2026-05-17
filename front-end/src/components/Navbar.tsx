import React from 'react'
import Link from 'next/link'

function Navbar() {
    return (
        <div>
            <nav className="flex justify-between items-center px-8 py-5 text-gray-800 shadow fixed w-full bg-white ">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    <h1 className="text-2xl font-bold tracking-tight">HireLink</h1>
                </Link>

                <div className="space-x-6 hidden md:flex">
                    <Link href="/jobs">Jobs</Link>
                    <Link href="/companies">Companies</Link>
                    <Link href="/about">About</Link>
                </div>

                <button className="bg-black text-white px-4 py-2 rounded-xl">
                    <Link href="/register">Sign Up</Link>
                </button>
            </nav>

        </div>
    )
}

export default Navbar

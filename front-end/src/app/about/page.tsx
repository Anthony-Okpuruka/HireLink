import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import { Search, Briefcase, MapPin } from "lucide-react";
import I from 'bootstrap-icons/';
import Image from 'next/image';

export default function about() {
    return (
        <div className="bg-white">
            <Navbar />
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-8 py-16 mt-25">
                <div className="grid md:grid-cols-2 gap-10 items-center bg-white border border-gray-200 rounded-[30px] p-10">

                    {/* Left Side */}
                    <div>
                        <span className="bg-[#F3EEE8] text-gray-800 px-4 py-2 rounded-full text-sm">
                            About HireLink
                        </span>

                        <h1 className="text-6xl font-bold leading-tight mt-6 text-gray-900">
                            Connecting Talent <br />
                            With Opportunity
                        </h1>

                        <p className="text-gray-500 text-lg leading-8 mt-6">
                            HireLink is a modern platform that helps people discover remote,
                            hybrid, and on-site jobs from top companies around the world.
                            Our mission is to make job searching simple, accessible, and
                            efficient for everyone.
                        </p>

                        {/* Stats */}
                        <div className="flex gap-10 mt-10">

                            <div className="flex items-center gap-4">
                                <div className="bg-[#F7F4EF] p-4 rounded-2xl">
                                    <i className="bi bi-briefcase-fill text-2xl text-black"></i>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
                                    <p className="text-gray-500">Job Opportunities</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-[#F7F4EF] p-4 rounded-2xl">
                                    <i className="bi bi-building text-2xl text-black"></i>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">200+</h3>
                                    <p className="text-gray-500">Trusted Companies</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex justify-center">
                     <i className="bi bi-people-fill text-[300px] text-black"></i>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-8 pb-12">
                <div className="bg-white border border-gray-200 rounded-[30px] p-10">

                    <h2 className="text-4xl font-bold mb-10 text-gray-800">
                        What We Offer
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">

                        {/* Feature 1 */}
                        <div>
                            <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl text-2xl">
                                <i className="bi bi-search text-2xl text-black"></i>
                            </div>

                            <h3 className="text-xl font-semibold mt-4 text-gray-800">
                                Smart Job Search
                            </h3>

                            <p className="text-gray-500 leading-7 mt-2">
                                Find jobs that match your skills, experience, and preferred work style.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div>
                            <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl text-2xl">
                                <i className="bi bi-people-fill text-2xl text-black"></i>
                            </div>

                            <h3 className="text-xl font-semibold mt-4 text-gray-800">
                                Top Companies
                            </h3>

                            <p className="text-gray-500 leading-7 mt-2">
                                Explore opportunities from verified and trusted companies worldwide.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div>
                            <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl text-2xl">
                                <i className="bi bi-globe-europe-africa text-2xl text-black"></i>
                            </div>

                            <h3 className="text-xl font-semibold mt-4 text-gray-800">
                                Flexible Options
                            </h3>

                            <p className="text-gray-500 leading-7 mt-2">
                                Discover remote, hybrid, and on-site roles that fit your lifestyle.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div>
                            <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl text-2xl">
                                <i className="bi bi-shield-lock-fill text-2xl text-black"></i>
                            </div>

                            <h3 className="text-xl font-semibold mt-4 text-gray-800">
                                Safe & Reliable
                            </h3>

                            <p className="text-gray-500 leading-7 mt-2">
                                We ensure a secure and reliable experience for all job seekers.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-8 pb-16">
                <div className="bg-white border border-gray-200 rounded-[30px] py-14 text-center">

                    <h2 className="text-4xl font-bold text-gray-800">
                        Ready to find your next opportunity?
                    </h2>

                    <button className="mt-6 bg-black text-white px-8 py-4 rounded-2xl text-lg">
                        <Link href="/jobs">
                            Browse Jobs</Link>
                    </button>

                </div>
            </section>

            {/* Footer */}
            <Footer />

        </div>
    )
}

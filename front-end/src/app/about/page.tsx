import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Search, Briefcase, Users, Globe, ShieldCheck } from "lucide-react";

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
              Our story
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6 text-gray-900">
              We connect talented people
              <br /> with meaningful opportunities
            </h1>

            <p className="text-gray-600 text-lg leading-8 mt-6 max-w-xl">
              At HireLink we help you discover remote, hybrid, and on-site roles
              at companies that value thoughtful hiring. We focus on making job
              search straightforward, fair, and — most importantly — human.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mt-10">
              <div className="flex items-center gap-4">
                <div className="bg-[#F7F4EF] p-4 rounded-2xl">
                  <Briefcase className="h-6 w-6 text-black" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
                  <p className="text-gray-500">Job Opportunities</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-[#F7F4EF] p-4 rounded-2xl">
                  <Users className="h-6 w-6 text-black" />
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
            <Users className="h-75 w-75 text-black" />
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
              <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl">
                <Search className="h-6 w-6 text-black" />
              </div>

              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                Smart Job Search
              </h3>

              <p className="text-gray-500 leading-7 mt-2">
                Find jobs that match your skills, experience, and preferred work
                style.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl">
                <Users className="h-6 w-6 text-black" />
              </div>

              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                Top Companies
              </h3>

              <p className="text-gray-500 leading-7 mt-2">
                Explore opportunities from verified and trusted companies
                worldwide.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl">
                <Globe className="h-6 w-6 text-black" />
              </div>

              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                Flexible Options
              </h3>

              <p className="text-gray-500 leading-7 mt-2">
                Discover remote, hybrid, and on-site roles that fit your
                lifestyle.
              </p>
            </div>

            {/* Feature 4 */}
            <div>
              <div className="bg-[#F7F4EF] w-fit p-4 rounded-2xl">
                <ShieldCheck className="h-6 w-6 text-black" />
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

      {/* Team Section */}
      <section id="team" className="max-w-7xl mx-auto px-8 pb-24">
        <div className="bg-[#FAF9F6] border border-gray-200 rounded-[30px] p-10 md:p-16">
          <div className="max-w-2xl mb-12">
            <span className="bg-[#F3EEE8] text-gray-800 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Project Contributors
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6 mb-4">
              Meet the Developers
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              We are a team of students from Pan-Atlantic University, collaborating on HireLink as our COS 202 course project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Nwaeze Ikemdinachukwu", matric: "24120112039" },
              { name: "Alamutu David", matric: "24120112008" },
              { name: "Fawaz Salimanu", matric: "24120112053" },
              { name: "Hillary Ilona", matric: "25120112059" },
              { name: "Adeyoyin Timilehin", matric: "25120112006" },
              { name: "Nasiru Muhammad Aminu", matric: "24120112032" }
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-slate-400 hover:shadow-xs group flex flex-col justify-between h-36"
              >
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Contributor 0{i + 1}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-1.5 transition-colors">
                    {member.name}
                  </h3>
                </div>
                
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center mt-4">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Matric Number</span>
                  <span className="text-xs text-slate-800 font-mono bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md font-semibold">
                    {member.matric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

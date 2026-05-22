"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // update the form states
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col mb-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8 inline-block hover:text-indigo-600 transition-colors">
              HireLink
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500">Sign in to continue to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <Link href="#" className="text-sm text-indigo-600 font-medium hover:text-indigo-700">Forgot password?</Link>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-indigo-600 transition-colors active:scale-[0.99] shadow-md mt-4"
            >
              Sign in
            </button>
          </form>

          <p className="text-center mt-8 text-slate-600 font-medium">
            Don't have an account?{" "}
            <Link href="/register" className="text-indigo-600 font-bold hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-blue items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px]  rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative w-full max-w-lg aspect-square">
          <Image 
            src="/illustrations/auth/Login-amico.png" 
            alt="Authentication Security" 
            fill 
            className="object-contain drop-shadow-2xl" 
            priority
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    // check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(form);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Left side: Illustration */}
      <div className="hidden lg:flex w-1/2 bg-cyan-50 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
        
        <div className="relative w-full max-w-lg aspect-square">
          <Image 
            src="/illustrations/auth/Sign up-amico.png" 
            alt="Secure Registration" 
            fill 
            className="object-contain drop-shadow-2xl" 
            priority
          />
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto h-screen">
        <div className="w-full max-w-md my-auto py-12">
          <div className="flex flex-col mb-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8 inline-block hover:text-indigo-600 transition-colors">
              HireLink
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Create an Account
            </h1>
            <p className="text-slate-500">Join our professional community today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 bg-white"
                required
              />
            </div>

            <div className="space-y-1.5">
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

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={(e) => updateField("password", e.target.value)}
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 bg-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-900 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-indigo-600 transition-colors active:scale-[0.99] shadow-md mt-6"
            >
              Create account
            </button>
          </form>

          <p className="text-center mt-8 text-slate-600 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

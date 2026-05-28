"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"candidate" | "employer">("candidate");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const candidateSteps = [
    {
      step: "01",
      title: "Register as a Candidate",
      description: "Sign up and select the 'Candidate' role. This configures your dashboard specifically for job searching, bookmarking, and tracking applications."
    },
    {
      step: "02",
      title: "Fill in Your Settings Profile (Required)",
      description: "Recruiters see your profile details when you apply. Go to the Settings tab to add your bio, skills, and links. If left empty, your application will appear blank.",
      urgent: true
    },
    {
      step: "03",
      title: "Search, Bookmark, and Apply",
      description: "Search open positions, bookmark listings you want to save for later, and apply instantly using the profile you completed in Step 2."
    }
  ];

  const employerSteps = [
    {
      step: "01",
      title: "Register as an Employer",
      description: "Create an account and select the 'Employer' role. This unlocks tools for posting jobs, managing listings, and tracking incoming applications."
    },
    {
      step: "02",
      title: "Complete Company Profile (Required)",
      description: "Go to Settings and enter your company name, website, and industry. A fully populated profile builds credibility and attracts higher quality applicants.",
      urgent: true
    },
    {
      step: "03",
      title: "Post Roles & Manage Applicants",
      description: "Publish vacancies with details, custom tags, and salaries. Track, review, and follow up with applicants directly within your dashboard."
    }
  ];

  const faqs = [
    {
      q: "Why is completing the Settings page mandatory?",
      a: "When you apply for a job or post a vacancy, HireLink dynamically generates a profile view using the data in your Settings. If you skip filling this out, recruiters or candidates will only see blank fields, which makes your account look inactive or incomplete."
    },
    {
      q: "Can I switch from candidate to employer?",
      a: "No, account roles are locked during registration to optimize your dashboard structure. If you need to test both views, you can create a second account using a different email address."
    },
    {
      q: "How does bookmarking work?",
      a: "Clicking the bookmark icon saves a listing directly to your personal 'Saved Jobs' page. This state is securely saved in the database, allowing you to access your bookmarks from any device once logged in."
    }
  ];

  return (
    <div className="bg-[#FAF9F6] text-slate-900 min-h-screen selection:bg-slate-900 selection:text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 border-b border-slate-200/60 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-4">
              Onboarding Checklist
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none mb-6">
              How HireLink works.
            </h1>
            <p className="text-md text-slate-500 leading-relaxed max-w-lg">
              A straightforward guide to getting your account set up, completing your profile, and submitting applications.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Guide */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid lg:grid-cols-3 gap-16 items-start">
        
        {/* Left Column: Tab Selectors & Summary */}
        <div className="lg:sticky lg:top-32 space-y-8">
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1 border border-slate-200/50 shadow-xs">
            <button
              onClick={() => setActiveTab("candidate")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "candidate"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/20"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "employer"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/20"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Employer
            </button>
          </div>

          <div className="bg-white border border-slate-200/70 p-6 rounded-2xl space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 text-slate-900">
              <AlertCircle size={20} className="text-slate-900 shrink-0" />
              <h4 className="font-bold text-sm uppercase tracking-wider">Before you begin</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              HireLink operates on a direct profile-sharing model. When you apply, employers receive your completed profile. Without entering details in Settings, your applications will appear empty.
            </p>
          </div>
        </div>

        {/* Right Column (2 spans): Step Timeline */}
        <div className="lg:col-span-2 space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {(activeTab === "candidate" ? candidateSteps : employerSteps).map((step, index) => (
                <div
                  key={index}
                  className={`bg-white border p-8 rounded-[24px] transition-all relative flex flex-col sm:flex-row gap-6 ${
                    step.urgent
                      ? "border-slate-900 ring-1 ring-slate-900 bg-slate-50/50"
                      : "border-slate-200 hover:border-slate-400/80"
                  }`}
                >
                  {/* Step indicator */}
                  <div className="text-3xl font-black tracking-tight text-slate-300 font-mono sm:w-12">
                    {step.step}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">
                        {step.title}
                      </h3>
                      {step.urgent && (
                        <span className="bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA Box */}
          <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-[32px] space-y-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="space-y-2 max-w-sm">
              <h3 className="text-xl font-bold tracking-tight">Ready to build your profile?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Log in to access your custom workspace and complete the settings checklist.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/register"
                className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all shadow-xs"
              >
                Get Started
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/login"
                className="border border-white/20 hover:border-white/50 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>

      </section>

      {/* FAQ Section */}
      <section className="bg-white border-t border-slate-200/60 py-24">
        <div className="max-w-3xl mx-auto px-8 space-y-12">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Quick answers about onboarding, permissions, and settings.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center text-left py-2 font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                >
                  <span className="text-sm tracking-tight">{faq.q}</span>
                  <ChevronDown
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      openFaq === i ? "rotate-180 text-slate-900" : ""
                    }`}
                    size={16}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-2 pb-4 text-xs text-slate-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

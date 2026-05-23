"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, RefreshCw, Search, CheckCircle2, Sparkles } from "lucide-react";

export default function NotificationsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="w-full min-h-[80vh] relative">
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-4 right-4 md:right-8 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 font-medium text-sm"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 animate-bounce" />
            <span>Notifications are fully up to date!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section with page title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-left max-w-2xl mt-2"
      >
        <p className="text-2xl font-light text-slate-800 tracking-tight leading-snug">
          Stay connected and <span className="font-semibold text-indigo-600">never miss a beat</span>.
        </p>
        <p className="text-slate-500 mt-2 text-sm">
          View your recent alerts, application updates, and new job matches.
        </p>
      </motion.div>

      {/* Premium Empty State Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl mx-auto py-12 text-center flex flex-col items-center justify-center"
      >
        {/* Dynamic Illustration Container */}
        <motion.div
          animate={isRefreshing ? {
            scale: [1, 0.95, 1.02, 1],
            rotate: [0, -1, 1, 0],
          } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-64 h-64 md:w-80 md:h-80 mb-6 shrink-0"
        >
          <Image
            src="/illustrations/notifications/undraw_unread-messages_hdpw.svg"
            alt="No unread messages"
            fill
            className="object-contain transition-opacity duration-300"
            style={{ opacity: isRefreshing ? 0.6 : 1 }}
            priority
          />
          {isRefreshing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-indigo-50/80 backdrop-blur-sm flex items-center justify-center border border-indigo-100 shadow-md">
                <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Status Text Block */}
        <div className="max-w-md">

          <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            No unread notifications
          </h2>
          <p className="text-slate-500 leading-relaxed text-sm md:text-base mb-8">
            You don't have any alerts at the moment. We will notify you here when employers respond to your applications or when new positions matching your profile are posted.
          </p>
        </div>

        {/* Action Button Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/dashboard/jobs"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-semibold hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-lg shadow-indigo-100"
          >
            <Search className="w-4.5 h-4.5" />
            <span>Browse Job Listings</span>
          </Link>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center justify-center gap-2 bg-slate-50 text-slate-700 border border-slate-200/80 px-8 py-3.5 rounded-2xl font-semibold hover:bg-slate-100 hover:text-slate-900 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <RefreshCw className={`w-4.5 h-4.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Check for updates</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}


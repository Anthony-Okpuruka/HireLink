"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, User, Briefcase, ShieldAlert, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export function DevRoleSwitcher() {
  const { roleOverride, setRoleOverride, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  // Auto-hide in production builds
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const roles = [
    {
      id: "jobseeker" as const,
      label: "Job Seeker",
      icon: User,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-indigo-50/50",
      borderActive: "border-indigo-500",
      textActive: "text-indigo-600",
    },
    {
      id: "employer" as const,
      label: "Employer",
      icon: Briefcase,
      color: "from-emerald-400 to-teal-600",
      bgLight: "bg-teal-50/50",
      borderActive: "border-teal-500",
      textActive: "text-teal-600",
    },
    {
      id: "admin" as const,
      label: "Administrator",
      icon: ShieldAlert,
      color: "from-violet-500 to-fuchsia-600",
      bgLight: "bg-fuchsia-50/50",
      borderActive: "border-fuchsia-500",
      textActive: "text-fuchsia-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all border border-slate-700/50 backdrop-blur-md"
            title="Configure Dashboard Previews"
          >
            <Sliders size={16} className="animate-pulse text-indigo-400" />
            <span className="text-xs font-bold tracking-tight">Dev Previews</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-80 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900 text-white select-none">
              <div className="flex items-center gap-2">
                <Sliders size={15} className="text-indigo-400" />
                <span className="text-xs font-black tracking-wider uppercase">Dev Dashboard Swapper</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-4">
              <div className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Toggle between the dashboard views instantly without having to log out or register new credentials.
              </div>

              {/* Roles Swapper Button List */}
              <div className="space-y-2">
                {roles.map((role) => {
                  const isActive = roleOverride === role.id || (!roleOverride && user?.role === role.id);
                  const Icon = role.icon;

                  return (
                    <button
                      key={role.id}
                      onClick={() => setRoleOverride(role.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isActive
                          ? `border-slate-300 bg-slate-50/50 shadow-sm`
                          : "border-slate-100 bg-slate-50/20 hover:border-slate-200 hover:bg-slate-50/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center text-white font-bold shadow-sm shrink-0`}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800">{role.label}</p>
                          <p className="text-[9px] text-slate-400 font-medium">Preview interface</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {isActive ? (
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white`}>
                            Active
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hover:text-slate-600 transition-colors">
                            Preview
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Control Actions */}
              {roleOverride && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-2"
                >
                  <button
                    onClick={() => setRoleOverride(null)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-all"
                  >
                    <RefreshCw size={12} className="animate-spin-slow" />
                    Reset to Auth Session
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

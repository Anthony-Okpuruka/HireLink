"use client";

import React from "react";
import { motion } from "framer-motion";

interface DashboardTallyCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
  description?: string;
  delay?: number;
}

export function DashboardTallyCard({
  label,
  value,
  icon,
  colorClass = "text-slate-700 bg-slate-100",
  description,
  delay = 0,
}: DashboardTallyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4 group"
    >
      <div
        className={`p-3.5 rounded-lg shrink-0 transition-transform group-hover:scale-105 ${colorClass} text-slate-900!`}
      >
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-2xl font-black tracking-tight text-slate-900">
          {value}
        </span>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </h3>
        {description && (
          <p className="text-[10px] font-medium text-slate-400 leading-none pt-0.5">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

import React from "react";

interface DashboardHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function DashboardHeader({
  icon,
  title,
  subtitle,
  description,
  action,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div className="text-left max-w-2xl mt-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-2">
          {icon}
          {title}
        </h1>
        <p className="text-lg font-light text-slate-800 tracking-tight leading-snug">
          {subtitle}
        </p>
        {description && (
          <p className="text-slate-500 mt-1 text-sm">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { apiService, Job, Application } from "@/lib/api-service";
import { mockActivityLogs, ActivityLog } from "@/lib/mock-data";
import {
  FileText,
  Calendar,
  Bookmark,
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  ChevronRight,
  XCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JobseekerOverview() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawingId, setIsWithdrawingId] = useState<number | null>(null);

  // Load Dashboard Data
  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      try {
        // Fetch My Applications
        const appRes = await apiService.applications.getMyApplications();
        if (appRes && appRes.applications) {
          setApplications(appRes.applications);
        }

        // Fetch All Jobs to recommend smart matches
        const jobRes = await apiService.jobs.getJobs();
        if (jobRes && jobRes.jobs) {
          // Recommend jobs based on matching industry or skills
          const seekerSkills = (user as any)?.skills?.toLowerCase() || "";
          const matches = jobRes.jobs.filter((job) => {
            // Don't recommend jobs already applied to
            const alreadyApplied = appRes.applications?.some(
              (a) => a.job_id === job.id,
            );
            if (alreadyApplied) return false;

            const titleMatch = seekerSkills.includes(job.title.toLowerCase());
            const industryMatch = seekerSkills.includes(
              job.industry.toLowerCase(),
            );
            const descMatch = job.description
              .toLowerCase()
              .split(" ")
              .some((word) => seekerSkills.includes(word));
            return titleMatch || industryMatch || descMatch;
          });

          // Fallback to top 2 listings if no matches
          setRecommendedJobs(
            matches.length > 0 ? matches.slice(0, 2) : jobRes.jobs.slice(0, 2),
          );
        }

        // Load activities
        setActivities(mockActivityLogs);
      } catch (err) {
        console.error("Failed to load seeker overview data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  // Withdraw from job application
  const handleWithdraw = async (appId: number) => {
    setIsWithdrawingId(appId);
    try {
      await apiService.applications.withdraw(appId);
      setApplications((prev) => prev.filter((app) => app.id !== appId));

      // Append a withdrawal log to activities
      const newLog: ActivityLog = {
        id: Date.now(),
        text: "You withdrew your application for a position.",
        timestamp: "Just now",
        type: "system",
      };
      setActivities((prev) => [newLog, ...prev]);
    } catch (err) {
      console.error("Failed to withdraw application:", err);
    } finally {
      setIsWithdrawingId(null);
    }
  };

  // Quick Apply to matches
  const handleQuickApply = async (jobId: number) => {
    try {
      const applyRes = await apiService.applications.apply(
        jobId,
        "I am applying quickly using my pre-configured HireLink developer profile. Please review my skills and experience detailed on my resume.",
      );
      if (applyRes && applyRes.application) {
        setApplications((prev) => [applyRes.application, ...prev]);
        setRecommendedJobs((prev) => prev.filter((j) => j.id !== jobId));

        const newLog: ActivityLog = {
          id: Date.now(),
          text: `Quick-applied to: ${applyRes.application.job_title} at ${applyRes.application.employer_name}`,
          timestamp: "Just now",
          type: "application",
        };
        setActivities((prev) => [newLog, ...prev]);
      }
    } catch (err) {
      console.error("Quick apply failed:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-slate-200 rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-slate-200 rounded-2xl" />
          <div className="h-64 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Derive Seeker Statistics
  const totalApps = applications.length;
  const interviewApps = applications.filter(
    (a) => a.status === "accepted",
  ).length;
  const rejectedApps = applications.filter(
    (a) => a.status === "rejected",
  ).length;
  const pendingApps = applications.filter((a) => a.status === "applied").length;

  const stats = [
    {
      label: "Applications Sent",
      value: totalApps,
      icon: FileText,
      color: "text-indigo-600 bg-indigo-50",
      description: "Active submissions",
    },
    {
      label: "Interviews Booked",
      value: interviewApps,
      icon: Calendar,
      color: "text-emerald-600 bg-emerald-50",
      description: "Awaiting your chat",
    },
    {
      label: "Pending Review",
      value: pendingApps,
      icon: Clock,
      color: "text-amber-600 bg-amber-50",
      description: "Under consideration",
    },
    {
      label: "Profile Match Rate",
      value: "88%",
      icon: MapPin,
      color: "text-violet-600 bg-violet-50",
      description: "Based on your skills",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans text-slate-800 pb-16">
      {/* Welcome Greeting Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="space-y-2 z-10">
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Welcome back, {user?.name || "Job Seeker"}!
          </h1>
          <p className="text-slate-300 text-sm max-w-xl font-medium">
            Your profile looks amazing! Your match rate is in the top 10% for
            frontend roles in your location. Keep applying to achieve your goal.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 shrink-0 z-10">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-none">
            Profile Strength
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-2xl font-black">92%</span>
            <div className="w-24 h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-400 rounded-full w-[92%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4 group"
            >
              <div
                className={`p-3.5 rounded-lg shrink-0 transition-transform group-hover:scale-105 ${stat.color}`}
              >
                <Icon size={20} />
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  {stat.value}
                </span>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </h3>
                <p className="text-[10px] font-medium text-slate-400 leading-none pt-0.5">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Core Dashboard Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side Column: Applications & Matches */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Application Timeline List */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  Active Applications
                </h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  Track your interview progress pipelines
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {applications.length} Active
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {applications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-3"
                >
                  <Briefcase size={36} className="text-slate-300" />
                  <p className="text-sm font-semibold text-slate-500">
                    No active applications found
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Use our custom jobs search directory to apply for frontend
                    listings!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {applications.map((app) => {
                    const steps = [
                      { key: "applied", label: "Applied", active: true },
                      {
                        key: "review",
                        label: "Reviewing",
                        active: app.status !== "applied" || true,
                      },
                      {
                        key: "interview",
                        label: "Interview",
                        active: app.status === "accepted",
                      },
                      {
                        key: "decision",
                        label: "Decision",
                        active:
                          app.status === "accepted" ||
                          app.status === "rejected",
                      },
                    ];

                    return (
                      <motion.div
                        key={app.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="p-5 rounded-xl border border-slate-100 hover:border-slate-200/80 transition-colors bg-slate-50/30 space-y-4 relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1.5 min-w-0">
                            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug truncate">
                              {app.job_title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-semibold">
                              <span className="flex items-center gap-1 text-slate-600">
                                <Building2 size={13} />
                                {app.employer_name}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={13} />
                                {app.location}
                              </span>
                              {app.salary && (
                                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50/50 px-2 py-0.5 rounded-md">
                                  <DollarSign size={13} />
                                  {app.salary}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Status Pill */}
                          <div className="shrink-0 flex items-center gap-2">
                            {app.status === "accepted" && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                                <CheckCircle2 size={11} /> Interview
                              </span>
                            )}
                            {app.status === "rejected" && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 flex items-center gap-1">
                                <XCircle size={11} /> Declined
                              </span>
                            )}
                            {app.status === "applied" && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                                <Clock size={11} /> Applied
                              </span>
                            )}

                            <button
                              disabled={isWithdrawingId === app.id}
                              onClick={() => handleWithdraw(app.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                              title="Withdraw Application"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Timeline Graphic Steps */}
                        <div className="pt-2">
                          <div className="flex justify-between items-center relative">
                            {/* Connector Line */}
                            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[3px] bg-slate-100 z-0">
                              <div
                                className={`h-full bg-indigo-500 rounded-full transition-all duration-500`}
                                style={{
                                  width:
                                    app.status === "accepted"
                                      ? "66%"
                                      : app.status === "rejected"
                                        ? "100%"
                                        : "25%",
                                }}
                              />
                            </div>

                            {steps.map((step, stepIdx) => {
                              const isFinished =
                                app.status === "accepted"
                                  ? stepIdx <= 2
                                  : app.status === "rejected"
                                    ? stepIdx <= 3
                                    : stepIdx === 0;

                              const isRejectedFinal =
                                app.status === "rejected" && stepIdx === 3;

                              return (
                                <div
                                  key={step.label}
                                  className="flex flex-col items-center z-10"
                                >
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${
                                      isRejectedFinal
                                        ? "bg-rose-500 text-white border-2 border-rose-600 scale-105"
                                        : isFinished
                                          ? "bg-indigo-600 text-white border-2 border-indigo-700"
                                          : "bg-white text-slate-300 border-2 border-slate-100"
                                    }`}
                                  >
                                    {isFinished ? (
                                      isRejectedFinal ? (
                                        <XCircle size={13} />
                                      ) : (
                                        <CheckCircle2 size={13} />
                                      )
                                    ) : (
                                      stepIdx + 1
                                    )}
                                  </div>
                                  <span
                                    className={`text-[9px] font-bold mt-1.5 ${
                                      isFinished
                                        ? "text-indigo-600 font-extrabold"
                                        : "text-slate-400"
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Smart Vacancy Matches Recommendation Carousel */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  Recommended for You
                </h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  Custom fits matched directly to your skillsets
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedJobs.length === 0 ? (
                <div className="col-span-2 py-8 text-center text-slate-400 text-xs font-semibold">
                  All matches successfully applied for! Check back tomorrow.
                </div>
              ) : (
                recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-5 rounded-xl border border-slate-100 hover:border-slate-200/80 transition-all bg-slate-50/10 flex flex-col justify-between hover:shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold tracking-widest text-indigo-600 uppercase">
                          {job.industry}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <Building2 size={13} className="text-slate-400" />
                          {job.employer_name}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 flex items-center gap-0.5">
                          <MapPin size={10} />
                          {job.location}
                        </span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 uppercase">
                          {job.job_type}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-slate-50 mt-4">
                      <span className="text-xs font-bold text-emerald-600">
                        {job.salary || "Competitive"}
                      </span>
                      <button
                        onClick={() => handleQuickApply(job.id)}
                        className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-indigo-600 text-white text-[10px] font-black tracking-wider uppercase hover:bg-indigo-700 transition-colors shrink-0 shadow-sm"
                      >
                        Quick Apply
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side Column: Activity Timeline logs */}
        <div className="space-y-8">
          {/* Timeline Feed Container */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-50 pb-4">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Recent Activity
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Updates on your application statuses
              </p>
            </div>

            <div className="relative border-l-2 border-slate-100 pl-4 space-y-6 ml-2">
              <AnimatePresence>
                {activities.map((act) => {
                  let dotColor = "bg-slate-400 border-slate-200";
                  if (act.type === "interview")
                    dotColor = "bg-emerald-500 border-emerald-100";
                  if (act.type === "application")
                    dotColor = "bg-indigo-500 border-indigo-100";
                  if (act.type === "view")
                    dotColor = "bg-amber-500 border-amber-100";

                  return (
                    <motion.div
                      key={act.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="relative space-y-1"
                    >
                      {/* Timeline Dot Indicator */}
                      <div
                        className={`absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${dotColor}`}
                      />
                      <p className="text-xs font-semibold text-slate-700 leading-snug">
                        {act.text}
                      </p>
                      <span className="text-[9px] text-slate-400 font-bold block">
                        {act.timestamp}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Platform Help Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
            <h3 className="text-sm font-black tracking-wider uppercase text-indigo-400">
              Need Assistance?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Read our modern platform guidelines, view documentation resources,
              or drop our technical admin support team a direct message in case
              of questions.
            </p>
            <button className="w-full flex items-center justify-between py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold transition-all text-white">
              Open Guideline Docs
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

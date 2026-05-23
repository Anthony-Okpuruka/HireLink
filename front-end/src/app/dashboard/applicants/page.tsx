"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
import { apiService } from "@/lib/api-service";
import { Loader2, Check, X } from "lucide-react";

interface Application {
  id: number;
  job_id: number;
  jobseeker_name?: string;
  jobseeker_email?: string;
  resume_url?: string | null;
  cover_letter?: string | null;
  applied_at: string;
  status: string;
}

const ApplicantsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();

  const jobId = Number(searchParams.get("jobId"));

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "employer")) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!jobId) return;

        setLoading(true);

        const response = await apiService.applications.getJobApplications(jobId);

        setApplications(response.applications || []);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "employer") {
      fetchApplications();
    }
  }, [user, jobId]);

  const updateStatus = async (id: number, status: "accepted" | "rejected") => {
    try {
      setUpdatingId(id);

      await apiService.applications.updateStatus(id, status);

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || user.role !== "employer") return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Job Applications
          </h1>

          <Link
            href="/dashboard/jobs/manage"
            className="text-blue-600 hover:underline"
          >
            Back to Jobs
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">
            No applications found.
          </p>
        ) : (
          <div className="space-y-4">

            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white p-5 rounded-xl shadow-sm border"
              >

                <div className="flex justify-between items-start">

                  <div className="flex gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {app.jobseeker_name?.charAt(0) || "U"}
                    </div>

                    <div>
                      <h2 className="font-semibold">
                        {app.jobseeker_name || "Unknown User"}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {app.jobseeker_email}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Applied: {app.applied_at}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      app.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {app.cover_letter && (
                  <p className="mt-3 text-sm text-gray-700">
                    {app.cover_letter}
                  </p>
                )}

                {app.resume_url && (
                  <a
                    href={app.resume_url}
                    target="_blank"
                    className="text-blue-600 text-sm underline block mt-2"
                  >
                    View Resume
                  </a>
                )}

                <div className="flex gap-3 mt-4">

                  <button
                    disabled={updatingId === app.id}
                    onClick={() =>
                      updateStatus(app.id, "accepted")
                    }
                    className="flex items-center gap-1 text-green-600 text-sm hover:underline"
                  >
                    <Check size={16} />
                    Accept
                  </button>

                  <button
                    disabled={updatingId === app.id}
                    onClick={() =>
                      updateStatus(app.id, "rejected")
                    }
                    className="flex items-center gap-1 text-red-600 text-sm hover:underline"
                  >
                    <X size={16} />
                    Reject
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default ApplicantsPage;
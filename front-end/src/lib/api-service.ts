import { apiFetch, API_URL } from "./api";
import { mockJobs, mockApplications, mockUsers, mockActivityLogs, logApiFallback } from "./mock-data";

// ==========================================
// TypeScript Types & Interfaces
// ==========================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: "jobseeker" | "employer" | "admin";
  created_at: string;
}

export interface JobseekerProfile extends User {
  bio: string | null;
  skills: string | null;
  experience: string | null;
  resume_url: string | null;
  location: string | null;
}

export interface EmployerProfile extends User {
  company_name: string | null;
  company_description: string | null;
  industry: string | null;
  website: string | null;
  location: string | null;
}

export interface Job {
  id: number;
  employer_id: number;
  employer_name?: string;
  title: string;
  description: string;
  location: string;
  industry: string;
  salary: string | null;
  salary_min: number | null;
  salary_max: number | null;
  job_type: "full-time" | "part-time" | "contract";
  deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job_id: number;
  user_id: number; // mapped from db 'jobseeker_id' in formatApplication
  status: "applied" | "accepted" | "rejected";
  cover_letter: string | null;
  applied_at: string;
  job_title?: string;
  location?: string;
  job_type?: string;
  industry?: string;
  salary?: string;
  employer_name?: string;
  jobseeker_name?: string;
  jobseeker_email?: string;
  bio?: string | null;
  skills?: string | null;
  experience?: string | null;
  resume_url?: string | null;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  message: string;
  pagination: PaginationInfo;
  users?: T[];
  jobs?: T[];
  applications?: T[];
}

const BASE_URL = API_URL.replace(/\/api$/, "") || "http://localhost:5001";

// ==========================================
// API Service Layer implementation
// ==========================================

export const apiService = {
  /**
   * Health Check Services (Database-free)
   */
  health: {
    check: async (timeoutMs: number = 5000): Promise<boolean> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(BASE_URL, { 
          method: "GET", 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        return res.ok;
      } catch (error) {
        clearTimeout(timeoutId);
        return false;
      }
    },
  },

  /**
   * Authentication Services
   */
  auth: {
    register: async (body: Record<string, any>): Promise<{ message: string; token: string; user: User }> => {
      return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },

    login: async (body: Record<string, any>): Promise<{ message: string; token: string; user: User }> => {
      return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },

    logout: async (): Promise<{ message: string }> => {
      return apiFetch("/auth/logout", {
        method: "POST",
      });
    },

    forgotPassword: async (email: string): Promise<{ message: string }> => {
      return apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    },

    resetPassword: async (body: Record<string, any>): Promise<{ message: string }> => {
      return apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
  },

  /**
   * User & Profile Services
   */
  users: {
    getMe: async (): Promise<{ user: JobseekerProfile | EmployerProfile | User }> => {
      try {
        return await apiFetch("/users/me", {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/users/me", err);
        const seeker = mockUsers.find(u => u.role === "jobseeker") as JobseekerProfile;
        return { user: seeker };
      }
    },

    updateMe: async (body: Record<string, any>): Promise<{ message: string; profile: any }> => {
      try {
        return await apiFetch("/users/me", {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } catch (err) {
        logApiFallback("/users/me [PUT]", err);
        return { message: "Updated profile in local preview", profile: body };
      }
    },

    changePassword: async (body: Record<string, any>): Promise<{ message: string }> => {
      return apiFetch("/users/me/password", {
        method: "PUT",
        body: JSON.stringify(body),
      });
    },

    deleteMe: async (): Promise<{ message: string }> => {
      return apiFetch("/users/me", {
        method: "DELETE",
      });
    },

    getUsers: async (params?: Record<string, any>): Promise<PaginatedResponse<User>> => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";
      try {
        return await apiFetch(`/users${query}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/users", err);
        return {
          message: "Loaded from mock data",
          pagination: { total: mockUsers.length, page: 1, limit: 10, pages: 1 },
          users: mockUsers,
        };
      }
    },

    deleteUser: async (id: number): Promise<{ message: string }> => {
      return apiFetch(`/users/${id}`, {
        method: "DELETE",
      });
    },

    getUserById: async (id: number): Promise<{ user: JobseekerProfile | EmployerProfile }> => {
      try {
        return await apiFetch(`/users/${id}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback(`/users/${id}`, err);
        const matched = mockUsers.find(u => u.id === id) as JobseekerProfile | EmployerProfile;
        if (!matched) throw new Error("Mock user not found");
        return { user: matched };
      }
    },
  },

  /**
   * Job Posting & Search Services
   */
  jobs: {
    getJobs: async (params?: Record<string, any>): Promise<PaginatedResponse<Job>> => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";
      try {
        return await apiFetch(`/jobs${query}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/jobs", err);
        return {
          message: "Loaded from mock data",
          pagination: { total: mockJobs.length, page: 1, limit: 10, pages: 1 },
          jobs: mockJobs,
        };
      }
    },

    searchJobs: async (params: Record<string, any>): Promise<PaginatedResponse<Job>> => {
      const query = `?${new URLSearchParams(params).toString()}`;
      try {
        return await apiFetch(`/jobs/search${query}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/jobs/search", err);
        // Basic offline search filter
        const text = (params.q || "").toLowerCase();
        const filtered = mockJobs.filter(
          j => j.title.toLowerCase().includes(text) || j.description.toLowerCase().includes(text)
        );
        return {
          message: "Filtered from mock data",
          pagination: { total: filtered.length, page: 1, limit: 10, pages: 1 },
          jobs: filtered,
        };
      }
    },

    getJob: async (id: number): Promise<{ job: Job }> => {
      try {
        return await apiFetch(`/jobs/${id}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback(`/jobs/${id}`, err);
        const found = mockJobs.find(j => j.id === id);
        if (!found) throw new Error("Mock job listing not found");
        return { job: found };
      }
    },

    postJob: async (body: Record<string, any>): Promise<{ message: string; job: Job }> => {
      try {
        return await apiFetch("/jobs", {
          method: "POST",
          body: JSON.stringify(body),
        });
      } catch (err) {
        logApiFallback("/jobs [POST]", err);
        const newJob: Job = {
          id: Date.now(),
          employer_id: 2,
          employer_name: "Mock Company",
          title: body.title,
          description: body.description,
          location: body.location,
          industry: body.industry,
          salary: body.salary || null,
          salary_min: Number(body.salary_min) || null,
          salary_max: Number(body.salary_max) || null,
          job_type: body.job_type || "full-time",
          deadline: body.deadline || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        mockJobs.unshift(newJob);
        return { message: "Job created in local preview", job: newJob };
      }
    },

    updateJob: async (id: number, body: Record<string, any>): Promise<{ message: string; job: Job }> => {
      try {
        return await apiFetch(`/jobs/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } catch (err) {
        logApiFallback(`/jobs/${id} [PUT]`, err);
        const found = mockJobs.find(j => j.id === id);
        if (!found) throw new Error("Mock job listing not found");
        const updated = { ...found, ...body };
        return { message: "Job updated in local preview", job: updated };
      }
    },

    deleteJob: async (id: number): Promise<{ message: string }> => {
      try {
        return await apiFetch(`/jobs/${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        logApiFallback(`/jobs/${id} [DELETE]`, err);
        return { message: "Job deleted from local preview" };
      }
    },
  },

  /**
   * Application Processing Services
   */
  applications: {
    apply: async (jobId: number, coverLetter?: string): Promise<{ message: string; application: Application }> => {
      try {
        return await apiFetch(`/apply/${jobId}`, {
          method: "POST",
          body: JSON.stringify({ cover_letter: coverLetter }),
        });
      } catch (err) {
        logApiFallback(`/apply/${jobId}`, err);
        const associatedJob = mockJobs.find(j => j.id === jobId);
        const mockApp: Application = {
          id: Date.now(),
          job_id: jobId,
          user_id: 1,
          status: "applied",
          cover_letter: coverLetter || null,
          applied_at: new Date().toISOString(),
          job_title: associatedJob?.title || "Position Applied",
          employer_name: associatedJob?.employer_name || "Enterprise Partner",
          salary: associatedJob?.salary || "",
          location: associatedJob?.location || "",
          job_type: associatedJob?.job_type || "full-time",
        };
        mockApplications.unshift(mockApp);
        return { message: "Application submitted in local preview", application: mockApp };
      }
    },

    getMyApplications: async (params?: Record<string, any>): Promise<PaginatedResponse<Application>> => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";
      try {
        return await apiFetch(`/applications${query}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/applications", err);
        return {
          message: "Loaded from mock data",
          pagination: { total: mockApplications.length, page: 1, limit: 10, pages: 1 },
          applications: mockApplications,
        };
      }
    },

    withdraw: async (id: number): Promise<{ message: string }> => {
      try {
        return await apiFetch(`/applications/${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        logApiFallback(`/applications/${id} [DELETE]`, err);
        const index = mockApplications.findIndex(a => a.id === id);
        if (index !== -1) {
          mockApplications.splice(index, 1);
        }
        return { message: "Application withdrawn from local preview" };
      }
    },

    getJobApplications: async (jobId: number, params?: Record<string, any>): Promise<PaginatedResponse<Application>> => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";
      try {
        return await apiFetch(`/applications/job/${jobId}${query}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback(`/applications/job/${jobId}`, err);
        const filtered = mockApplications.filter(a => a.job_id === jobId);
        return {
          message: "Loaded from mock data",
          pagination: { total: filtered.length, page: 1, limit: 10, pages: 1 },
          applications: filtered,
        };
      }
    },

    updateStatus: async (id: number, status: "accepted" | "rejected"): Promise<{ message: string; application: Application }> => {
      try {
        return await apiFetch(`/applications/${id}/status`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        });
      } catch (err) {
        logApiFallback(`/applications/${id}/status [PATCH]`, err);
        const found = mockApplications.find(a => a.id === id);
        if (!found) throw new Error("Mock application not found");
        found.status = status;
        return { message: "Status updated in local preview", application: found };
      }
    },
  },

  /**
   * Bookmarks / Saved Jobs Services
   */
  bookmarks: {
    getBookmarkedJobIds: async (): Promise<number[]> => {
      try {
        const response = await apiFetch("/bookmarks", { method: "GET" });
        return response.job_ids || response.bookmarks || [];
      } catch (err) {
        logApiFallback("/bookmarks [GET]", err);
        if (typeof window !== "undefined") {
          return JSON.parse(localStorage.getItem("saved_job_ids") || "[]").map(Number);
        }
        return [];
      }
    },

    saveJob: async (jobId: number): Promise<{ message: string }> => {
      try {
        return await apiFetch("/bookmarks", {
          method: "POST",
          body: JSON.stringify({ job_id: jobId }),
        });
      } catch (err) {
        logApiFallback("/bookmarks [POST]", err);
        if (typeof window !== "undefined") {
          const savedIds = JSON.parse(localStorage.getItem("saved_job_ids") || "[]") as (string | number)[];
          const numericId = Number(jobId);
          if (!savedIds.map(Number).includes(numericId)) {
            localStorage.setItem("saved_job_ids", JSON.stringify([...savedIds, numericId]));
          }
        }
        return { message: "Saved job in local preview" };
      }
    },

    unsaveJob: async (jobId: number): Promise<{ message: string }> => {
      try {
        return await apiFetch(`/bookmarks/${jobId}`, {
          method: "DELETE",
        });
      } catch (err) {
        logApiFallback(`/bookmarks/${jobId} [DELETE]`, err);
        if (typeof window !== "undefined") {
          const savedIds = JSON.parse(localStorage.getItem("saved_job_ids") || "[]") as (string | number)[];
          const updated = savedIds.filter((id) => Number(id) !== Number(jobId));
          localStorage.setItem("saved_job_ids", JSON.stringify(updated));
        }
        return { message: "Removed job in local preview" };
      }
    },
  },

  /**
   * Notifications Services
   */
  notifications: {
    getNotifications: async (params?: Record<string, any>): Promise<PaginatedResponse<any>> => {
      const query = params ? `?${new URLSearchParams(params).toString()}` : "";
      try {
        return await apiFetch(`/notifications${query}`, {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/notifications", err);
        let userRole = "jobseeker";
        if (typeof window !== "undefined") {
          try {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              const userObj = JSON.parse(userStr);
              if (userObj && userObj.role) {
                userRole = userObj.role;
              }
            }
          } catch {}
        }

        let filteredLogs = mockActivityLogs;
        if (userRole === "employer") {
          filteredLogs = [
            { id: 1, text: "A new applicant, Alex Rivera, applied for your listing 'Junior Frontend Engineer'", timestamp: "2 hours ago", type: "application" },
            { id: 2, text: "Your posting 'Product Designer' reached 45 active views today.", timestamp: "1 day ago", type: "view" },
            { id: 3, text: "System Health Alert: Backup database completed successfully.", timestamp: "2 days ago", type: "system" }
          ] as any;
        } else if (userRole === "admin") {
          filteredLogs = [
            { id: 1, text: "System load spike warning: CPU reached 87%.", timestamp: "5 mins ago", type: "system" },
            { id: 2, text: "There are 5 pending employer profile approvals in the queue.", timestamp: "2 hours ago", type: "application" }
          ] as any;
        }

        const formatted = filteredLogs.map((log) => ({
          id: log.id,
          user_id: 1,
          type: log.type,
          message: log.text,
          read: false,
          created_at: new Date(Date.now() - log.id * 4 * 3600 * 1000).toISOString(),
        }));

        return {
          message: "Loaded from mock data",
          pagination: { total: formatted.length, page: 1, limit: 10, pages: 1 },
          notifications: formatted,
        } as any;
      }
    },

    getAllNotifications: async (): Promise<{ notifications: any[] }> => {
      try {
        return await apiFetch("/notifications/all", {
          method: "GET",
        });
      } catch (err) {
        logApiFallback("/notifications/all", err);
        let userRole = "jobseeker";
        if (typeof window !== "undefined") {
          try {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              const userObj = JSON.parse(userStr);
              if (userObj && userObj.role) {
                userRole = userObj.role;
              }
            }
          } catch {}
        }

        let filteredLogs = mockActivityLogs;
        if (userRole === "employer") {
          filteredLogs = [
            { id: 1, text: "A new applicant, Alex Rivera, applied for your listing 'Junior Frontend Engineer'", timestamp: "2 hours ago", type: "application" },
            { id: 2, text: "Your posting 'Product Designer' reached 45 active views today.", timestamp: "1 day ago", type: "view" },
            { id: 3, text: "System Health Alert: Backup database completed successfully.", timestamp: "2 days ago", type: "system" }
          ] as any;
        } else if (userRole === "admin") {
          filteredLogs = [
            { id: 1, text: "System load spike warning: CPU reached 87%.", timestamp: "5 mins ago", type: "system" },
            { id: 2, text: "There are 5 pending employer profile approvals in the queue.", timestamp: "2 hours ago", type: "application" }
          ] as any;
        }

        const formatted = filteredLogs.map((log) => ({
          id: log.id,
          user_id: 1,
          type: log.type,
          message: log.text,
          read: false,
          created_at: new Date(Date.now() - log.id * 4 * 3600 * 1000).toISOString(),
        }));

        return {
          notifications: formatted,
        };
      }
    },
  },
};

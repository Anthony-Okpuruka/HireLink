"use client";

import { useState, useEffect } from "react";
import { User as UserIcon, Shield, Save, Loader2, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/hooks/useAuth";
import { apiService } from "@/lib/api-service";

export default function SettingsPage() {
  const { user, refreshUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile Info States
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  
  // Seeker Specific Profile States
  const [seekerBio, setSeekerBio] = useState("");
  const [seekerSkills, setSeekerSkills] = useState("");
  const [seekerExperience, setSeekerExperience] = useState("");
  const [seekerLocation, setSeekerLocation] = useState("");
  const [seekerResume, setSeekerResume] = useState("");

  // Employer Specific Profile States
  const [empCompanyName, setEmpCompanyName] = useState("");
  const [empCompanyDesc, setEmpCompanyDesc] = useState("");
  const [empIndustry, setEmpIndustry] = useState("");
  const [empWebsite, setEmpWebsite] = useState("");
  const [empLocation, setEmpLocation] = useState("");

  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI Flow States
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state values when user context loads
  useEffect(() => {
    if (user) {
      setProfileName(user.name || "");
      setProfileEmail(user.email || "");

      // Safe casting based on role
      if (user.role === "jobseeker") {
        const seeker = user as any;
        setSeekerBio(seeker.bio || "");
        setSeekerSkills(seeker.skills || "");
        setSeekerExperience(seeker.experience || "");
        setSeekerLocation(seeker.location || "");
        setSeekerResume(seeker.resume_url || "");
      } else if (user.role === "employer") {
        const emp = user as any;
        setEmpCompanyName(emp.company_name || "");
        setEmpCompanyDesc(emp.company_description || "");
        setEmpIndustry(emp.industry || "");
        setEmpWebsite(emp.website || "");
        setEmpLocation(emp.location || "");
      }
    }
  }, [user]);

  const triggerToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Submit Profile information updates to the backend
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    try {
      let body: Record<string, any> = {
        name: profileName,
        email: profileEmail,
      };

      if (user?.role === "jobseeker") {
        body = {
          ...body,
          bio: seekerBio,
          skills: seekerSkills,
          experience: seekerExperience,
          location: seekerLocation,
          resume_url: seekerResume,
        };
      } else if (user?.role === "employer") {
        body = {
          ...body,
          company_name: empCompanyName,
          company_description: empCompanyDesc,
          industry: empIndustry,
          website: empWebsite,
          location: empLocation,
        };
      }

      const res = await apiService.users.updateMe(body);
      if (res) {
        await refreshUser();
        triggerToast("Profile information updated successfully!");
      }
    } catch (err: any) {
      console.error("Failed to update profile settings:", err);
      triggerToast(err.message || "Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Submit Password update requests to the backend
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;

    if (!currentPassword) {
      triggerToast("Current password is required", "error");
      return;
    }
    if (newPassword.length < 8) {
      triggerToast("New password must be at least 8 characters long", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast("New passwords do not match", "error");
      return;
    }

    setIsSaving(true);
    try {
      const res = await apiService.users.changePassword({
        currentPassword,
        newPassword,
      });
      if (res) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        triggerToast("Password changed successfully!");
      }
    } catch (err: any) {
      console.error("Failed to update password:", err);
      triggerToast(err.message || "Failed to update password", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Submit Delete Account action
  const handleDeleteAccount = async () => {
    if (isDeleting) return;
    
    const firstConfirm = confirm("WARNING: Are you absolutely sure you want to delete your account? This action is permanent and will delete all your profile data and application history.");
    if (!firstConfirm) return;

    const secondConfirm = confirm("FINAL CONFIRMATION: Double check your choice. Click OK to completely remove your account and log out.");
    if (!secondConfirm) return;

    setIsDeleting(true);
    try {
      const res = await apiService.users.deleteMe();
      if (res) {
        alert("Your account has been deleted successfully. We are sorry to see you go!");
        logout();
      }
    } catch (err: any) {
      console.error("Failed to delete account:", err);
      triggerToast(err.message || "Failed to delete account", "error");
      setIsDeleting(false);
    }
  };

  const isSeeker = user?.role === "jobseeker";
  const isEmployer = user?.role === "employer";

  return (
    <div className="w-full min-h-[80vh]">
      {/* Toast Alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 right-5 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-xl border ${
              toastType === "success" 
                ? "bg-slate-900 border-slate-800" 
                : "bg-rose-600 border-rose-500"
            }`}
          >
            {toastType === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-bounce" />
            ) : (
              <AlertCircle className="h-5 w-5 text-white animate-bounce" />
            )}
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section with page title */}
      <div className="mb-8 text-left max-w-2xl mt-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mb-2">
          Settings
        </h1>
        <p className="text-lg font-light text-slate-800 tracking-tight leading-snug">
          Fine-tune your experience and <span className="font-semibold text-emerald-600">stay in control</span>.
        </p>
        <p className="text-slate-500 mt-1 text-sm">
          Manage your account preferences, update your personal information, and configure your secure details.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-2">
            {[
              { id: "profile", label: "Profile Information", icon: UserIcon },
              { id: "security", label: "Security & Danger Zone", icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all text-sm text-left ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100/50"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? "text-indigo-600" : "text-slate-400"} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Tab Content */}
        <main className="flex-1 bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm max-w-3xl">
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4 flex items-center gap-2">
                Personal Details
              </h2>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                  />
                </div>

                {/* Job Seeker Dynamic Fields */}
                {isSeeker && (
                  <>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Professional Bio</label>
                      <textarea
                        rows={4}
                        value={seekerBio}
                        onChange={(e) => setSeekerBio(e.target.value)}
                        placeholder="Draft a brief intro bio detailing your engineering strengths..."
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium resize-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Skills</label>
                      <input
                        type="text"
                        value={seekerSkills}
                        onChange={(e) => setSeekerSkills(e.target.value)}
                        placeholder="React, TypeScript, Node.js, Express..."
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Experience Level</label>
                      <input
                        type="text"
                        value={seekerExperience}
                        onChange={(e) => setSeekerExperience(e.target.value)}
                        placeholder="Freelance (1 yr), Engineering Intern (6 mos)..."
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location / Workspace</label>
                      <input
                        type="text"
                        value={seekerLocation}
                        onChange={(e) => setSeekerLocation(e.target.value)}
                        placeholder="Lagos, Nigeria (Hybrid)"
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Resume URL link</label>
                      <input
                        type="url"
                        value={seekerResume}
                        onChange={(e) => setSeekerResume(e.target.value)}
                        placeholder="https://drive.google.com/your-resume.pdf"
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                  </>
                )}

                {/* Employer Dynamic Fields */}
                {isEmployer && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                      <input
                        type="text"
                        value={empCompanyName}
                        onChange={(e) => setEmpCompanyName(e.target.value)}
                        placeholder="Enterprise Partner Inc."
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Corporate Industry</label>
                      <input
                        type="text"
                        value={empIndustry}
                        onChange={(e) => setEmpIndustry(e.target.value)}
                        placeholder="Fintech, Edtech, E-commerce..."
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Corporate Website</label>
                      <input
                        type="url"
                        value={empWebsite}
                        onChange={(e) => setEmpWebsite(e.target.value)}
                        placeholder="https://companyname.com"
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Corporate Headquarters</label>
                      <input
                        type="text"
                        value={empLocation}
                        onChange={(e) => setEmpLocation(e.target.value)}
                        placeholder="Lagos, Nigeria (Hybrid)"
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Description</label>
                      <textarea
                        rows={4}
                        value={empCompanyDesc}
                        onChange={(e) => setEmpCompanyDesc(e.target.value)}
                        placeholder="Draft a summary details of your business products, values, and solutions..."
                        className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 px-6 py-3.5 rounded-xl font-bold transition-all hover:shadow-[0_8px_20px_rgba(79,70,229,0.15)] active:scale-95 duration-200 shrink-0"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={16} />}
                  <span>{isSaving ? "Saving..." : "Save Profile Details"}</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <div className="space-y-8 animate-fade-in">
              <form onSubmit={handleSaveSecurity} className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">
                  Security Settings
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2 max-w-md">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Current Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-50/50 hover:border-slate-200 focus:bg-white focus:border-indigo-500 rounded-xl outline-none transition-all text-sm text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 px-6 py-3.5 rounded-xl font-bold transition-all hover:shadow-[0_8px_20px_rgba(79,70,229,0.15)] active:scale-95 duration-200 shrink-0"
                  >
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save size={16} />}
                    <span>{isSaving ? "Saving..." : "Change Password"}</span>
                  </button>
                </div>
              </form>

              {/* Danger Zone */}
              <div className="pt-8 border-t border-slate-150">
                <div className="bg-rose-50/30 p-6 rounded-xl border border-rose-100/60 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-md font-extrabold text-rose-700 flex items-center gap-2">
                      <ShieldAlert size={20} />
                      Danger Zone
                    </h3>
                    <p className="text-xs text-rose-600 font-medium leading-relaxed max-w-lg">
                      Deleting your account will completely remove your entire profile row, submitted application files, and active settings from the database. This action is irreversible.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="inline-flex items-center justify-center bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 duration-200 shrink-0"
                  >
                    {isDeleting ? <Loader2 className="h-3 w-3 animate-spin mr-1.5" /> : null}
                    {isDeleting ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

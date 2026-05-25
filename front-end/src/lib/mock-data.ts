import { User, Job, Application, JobseekerProfile, EmployerProfile } from "./api-service";

export interface DashboardStats {
  jobseeker: {
    totalApplications: number;
    interviewsScheduled: number;
    savedJobs: number;
    matchRate: number; // percentage
  };
  employer: {
    activeJobs: number;
    totalApplicants: number;
    interviewsScheduled: number;
    pendingReview: number;
  };
  admin: {
    totalUsers: number;
    totalJobs: number;
    pendingApprovals: number;
    systemLoad: number; // percentage
  };
}

export interface ActivityLog {
  id: number;
  text: string;
  timestamp: string;
  type:
    | "application"
    | "message"
    | "view"
    | "system"
    | "interview"
    | "new_application"
    | "application_accepted"
    | "application_rejected";
}

// ==========================================
// High-Fidelity Mock Database Data
// ==========================================

export const mockUsers: (User | JobseekerProfile | EmployerProfile)[] = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex.rivera@gmail.com",
    role: "jobseeker",
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    bio: "Full Stack Engineer specializing in React, Next.js, and TypeScript. Passionate about clean code, robust architectures, and interactive digital interfaces.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Docker",
    experience: "Software Engineering Intern at TechVanguard (6 months), Freelance Developer (1 year)",
    resume_url: "https://hirelink.com/resumes/alex-rivera.pdf",
    location: "Lagos, Nigeria",
  } as JobseekerProfile,
  {
    id: 2,
    name: "Jane Smith",
    email: "hr@stripe.com",
    role: "employer",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    company_name: "Stripe",
    company_description: "Stripe is a suite of APIs powering online payment processing and commerce solutions for internet businesses.",
    industry: "Fintech",
    website: "https://stripe.com",
    location: "Dublin, Ireland",
  } as EmployerProfile,
  {
    id: 3,
    name: "Marcus Aurelius",
    email: "system.admin@hirelink.com",
    role: "admin",
    created_at: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  } as User,
];

export const mockJobs: Job[] = [
  {
    id: 101,
    employer_id: 2,
    employer_name: "Stripe",
    title: "Junior Frontend Engineer (React/TypeScript)",
    description: "We are looking for a Junior Frontend Developer who is passionate about pixel-perfect user interfaces, modular React architecture, and clean typescript systems. You will collaborate directly with Stripe's payments dashboard team to prototype, optimize, and build interactive widgets and developer tools.\n\n### What You Will Do:\n- Build web interfaces using React, TypeScript, and modern CSS modules.\n- Optimize rendering paths for low latency screens.\n- Write reliable unit and integration tests.\n\n### Requirements:\n- Proficient in React and modern ES6 Javascript.\n- Comfortable with TailwindCSS and CSS styling layouts.\n- Experience with fetch logic and API integrations.",
    location: "Dublin, Ireland (Hybrid)",
    industry: "Fintech",
    salary: "$65,000 - $80,000 / year",
    salary_min: 65000,
    salary_max: 80000,
    job_type: "full-time",
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 102,
    employer_id: 2,
    employer_name: "Paystack",
    title: "Product Designer (UI/UX - Glassmorphism)",
    description: "Paystack helps businesses in Africa get paid by anyone, anywhere in the world. We are seeking an ambitious product designer to help lead the styling system for our next-generation consumer apps. You'll build premium, polished interfaces with rich animations, micro-interactions, and harmonic color palettes.\n\n### Ideal Candidate:\n- 1-3 years designing responsive web and mobile interfaces.\n- Mastery over modern typography hierarchy, grids, and glassmorphic designs.\n- Hands-on experience translating designs into Tailwind/CSS layouts.",
    location: "Lagos, Nigeria (Remote)",
    industry: "Fintech",
    salary: "₦12,000,000 - ₦18,000,000 / year",
    salary_min: 12000000,
    salary_max: 18000000,
    job_type: "full-time",
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 103,
    employer_id: 5,
    employer_name: "Google DeepMind",
    title: "Frontend Engineering Intern (AI Tools)",
    description: "Join the team building the futures of scientific discovery and intelligence tools. You will support the deployment and optimization of frontend dashboards for our internal developer portals, connecting web layouts to Gemini API logic interfaces.\n\n### Requirements:\n- Solid core in HTML5, CSS3, and JavaScript.\n- Highly motivated, self-driven developer who thrives in fast-paced research centers.\n- Basic knowledge of nextJS / React workflows.",
    location: "London, UK (On-site)",
    industry: "Artificial Intelligence",
    salary: "£3,500 / month",
    salary_min: 42000,
    salary_max: 42000,
    job_type: "contract",
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 104,
    employer_id: 6,
    employer_name: "GitHub",
    title: "Junior Support Engineer (API Integrations)",
    description: "Help developer communities solve complex issues regarding GitHub Actions, workflows, and workspace configurations. You'll analyze logs, troubleshoot API authentication codes, and write small diagnostic scripts.",
    location: "San Francisco, CA (Remote)",
    industry: "Tech / Cloud",
    salary: "$75,000 - $95,000 / year",
    salary_min: 75000,
    salary_max: 95000,
    job_type: "full-time",
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockApplications: Application[] = [
  {
    id: 1,
    job_id: 101,
    user_id: 1,
    status: "accepted",
    cover_letter: "I am deeply excited to apply for the Junior Frontend Engineer role at Stripe. I have been building high-fidelity web experiences in React and TypeScript. My project, HireLink, demonstrates my commitment to modular architecture and clean responsive design. I look forward to contributing to your Payments UI development.",
    applied_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    job_title: "Junior Frontend Engineer (React/TypeScript)",
    location: "Dublin, Ireland (Hybrid)",
    job_type: "full-time",
    industry: "Fintech",
    salary: "$65,000 - $80,000 / year",
    employer_name: "Stripe",
    jobseeker_name: "Alex Rivera",
    jobseeker_email: "alex.rivera@gmail.com",
    bio: "Full Stack Engineer specializing in React, Next.js, and TypeScript. Passionate about clean code.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Express",
    experience: "Software Engineering Intern at TechVanguard (6 months)",
    resume_url: "https://hirelink.com/resumes/alex-rivera.pdf",
  },
  {
    id: 2,
    job_id: 102,
    user_id: 1,
    status: "applied",
    cover_letter: "Dear Paystack Team, my UI and UX skill sets align directly with Paystack's high visual design standards. I have extensive experience setting up modern, animated, glassmorphic layout wrappers and components in TailwindCSS.",
    applied_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    job_title: "Product Designer (UI/UX - Glassmorphism)",
    location: "Lagos, Nigeria (Remote)",
    job_type: "full-time",
    industry: "Fintech",
    salary: "₦12,000,000 - ₦18,000,000 / year",
    employer_name: "Paystack",
    jobseeker_name: "Alex Rivera",
    jobseeker_email: "alex.rivera@gmail.com",
    bio: "Full Stack Engineer specializing in React, Next.js, and TypeScript. Passionate about clean code.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Express",
    experience: "Software Engineering Intern at TechVanguard (6 months)",
    resume_url: "https://hirelink.com/resumes/alex-rivera.pdf",
  },
  {
    id: 3,
    job_id: 103,
    user_id: 1,
    status: "rejected",
    cover_letter: "I would love to support Google DeepMind's team. I have structured NextJS applications and connecting them to REST APIs is a core strength.",
    applied_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    job_title: "Frontend Engineering Intern (AI Tools)",
    location: "London, UK (On-site)",
    job_type: "contract",
    industry: "Artificial Intelligence",
    salary: "£3,500 / month",
    employer_name: "Google DeepMind",
    jobseeker_name: "Alex Rivera",
    jobseeker_email: "alex.rivera@gmail.com",
    bio: "Full Stack Engineer specializing in React, Next.js, and TypeScript. Passionate about clean code.",
    skills: "React, Next.js, TypeScript, Tailwind CSS, Node.js, Express",
    experience: "Software Engineering Intern at TechVanguard (6 months)",
    resume_url: "https://hirelink.com/resumes/alex-rivera.pdf",
  },
];

export const mockStats: DashboardStats = {
  jobseeker: {
    totalApplications: 3,
    interviewsScheduled: 1,
    savedJobs: 5,
    matchRate: 88,
  },
  employer: {
    activeJobs: 4,
    totalApplicants: 14,
    interviewsScheduled: 3,
    pendingReview: 6,
  },
  admin: {
    totalUsers: 142,
    totalJobs: 54,
    pendingApprovals: 5,
    systemLoad: 24,
  },
};

export const mockJobseekerActivityLogs: ActivityLog[] = [
  {
    id: 1,
    text: "Stripe updated your application status to: Accepted / Interview Scheduled",
    timestamp: "2 hours ago",
    type: "interview",
  },
  {
    id: 2,
    text: "You submitted an application for: Product Designer at Paystack",
    timestamp: "1 day ago",
    type: "application",
  },
  {
    id: 3,
    text: "Google DeepMind reviewed your profile for AI Tools InternshipCenter",
    timestamp: "3 days ago",
    type: "view",
  },
  {
    id: 4,
    text: "Welcome to HireLink! Your jobseeker profile was successfully created.",
    timestamp: "1 week ago",
    type: "system",
  },
  {
    id: 5,
    text: "Your application for 'Junior Frontend Engineer' was accepted by Stripe.",
    timestamp: "4 hours ago",
    type: "application_accepted",
  },
  {
    id: 6,
    text: "Your application for 'Backend Intern' was not selected.",
    timestamp: "5 days ago",
    type: "application_rejected",
  },
];

export const mockEmployerActivityLogs: ActivityLog[] = [
  {
    id: 1,
    text: "A new applicant, Alex Rivera, applied for your job posting 'Product Designer'.",
    timestamp: "2 hours ago",
    type: "new_application",
  },
  {
    id: 2,
    text: "Your posting 'Junior Frontend Engineer' reached 45 active views today.",
    timestamp: "1 day ago",
    type: "view",
  },
  {
    id: 3,
    text: "System Health Alert: Backup database completed successfully.",
    timestamp: "2 days ago",
    type: "system",
  },
];

export const mockAdminActivityLogs: ActivityLog[] = [
  {
    id: 1,
    text: "System load spike warning: CPU reached 87%.",
    timestamp: "5 mins ago",
    type: "system",
  },
  {
    id: 2,
    text: "There are 5 pending employer profile approvals in the queue.",
    timestamp: "2 hours ago",
    type: "application",
  },
];

// Reusable backward compatibility
export const mockActivityLogs = mockJobseekerActivityLogs;

// Reusable Fallback Logger
export function logApiFallback(endpoint: string, error?: any) {
  console.warn(
    `%c[HireLink API] ⚠️ Server offline/database down at '${endpoint}'. Serving high-fidelity mock database.`,
    "color: #f59e0b; font-weight: bold; background: #fef3c7; padding: 2px 6px; border-radius: 4px; border: 1px solid #fcd34d;"
  );
  if (error) {
    console.debug("Backend connection failure context:", error);
  }
}

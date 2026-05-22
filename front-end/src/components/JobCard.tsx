import Link from "next/link";
import { MapPin, Bookmark, Clock, DollarSign } from "lucide-react";

interface JobCardProps {
  id: string | number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  tags?: string[];
}

const colors = [
  "bg-red-100 text-red-600 border-red-200",
  "bg-orange-100 text-orange-600 border-orange-200",
  "bg-amber-100 text-amber-600 border-amber-200",
  "bg-green-100 text-green-600 border-green-200",
  "bg-emerald-100 text-emerald-600 border-emerald-200",
  "bg-teal-100 text-teal-600 border-teal-200",
  "bg-cyan-100 text-cyan-600 border-cyan-200",
  "bg-blue-100 text-blue-600 border-blue-200",
  "bg-indigo-100 text-indigo-600 border-indigo-200",
  "bg-violet-100 text-violet-600 border-violet-200",
  "bg-purple-100 text-purple-600 border-purple-200",
  "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-200",
  "bg-pink-100 text-pink-600 border-pink-200",
  "bg-rose-100 text-rose-600 border-rose-200",
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function JobCard({
  id,
  title,
  company,
  location,
  type,
  salary,
  description,
  tags = [],
}: JobCardProps) {
  const avatarColor = getAvatarColor(company);
  const initial = company.charAt(0).toUpperCase();

  return (
    <Link href={`/jobs/${id}`} className="block h-full group">
      <div className="bg-white p-6 rounded-[1.25rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 border border-slate-100 hover:border-slate-200 flex flex-col h-full -translate-y-0 hover:-translate-y-1">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center min-w-0">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold border shrink-0 ${avatarColor}`}>
              {initial}
            </div>
            <div className="min-w-0">
              <h3 className="text-[1.1rem] font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{title}</h3>
              <p className="text-slate-500 text-sm mt-0.5 truncate font-medium">{company}</p>
            </div>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); }} 
            className="text-slate-300 hover:text-indigo-500 transition-colors shrink-0 ml-4 p-1 rounded-full hover:bg-indigo-50"
          >
            <Bookmark size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Location & Salary inline */}
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-4 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin size={15} strokeWidth={2.5} className="text-slate-400" />
            <span className="truncate max-w-[120px]">{location}</span>
          </div>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <DollarSign size={15} strokeWidth={2.5} className="text-emerald-500" />
            {salary || "Competitive"}
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{description}</p>

        {/* Footer info (Tags & Time) */}
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-600 text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-md font-bold">
              {type.split('•')[0].trim()}
            </span>
            {tags && tags.length > 0 && (
              <span className="bg-indigo-50 text-indigo-700 text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-md font-bold hidden sm:inline-block">
                {tags[0]}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <Clock size={13} strokeWidth={2.5} />
            2d ago
          </div>
        </div>
      </div>
    </Link>
  );
}

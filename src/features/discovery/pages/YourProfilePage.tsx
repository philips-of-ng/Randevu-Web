import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, LogOut, Compass, Sparkles, MapPin } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const YourProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Attendee Profile
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Manage your account details and security settings.
        </p>
      </div>

      {/* User Identity Card */}
      <div className="rounded-3xl border border-neutral-800/80 bg-neutral-900/40 p-6 backdrop-blur-md space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-xl font-extrabold text-white shadow-xl shadow-rose-500/10">
            {user?.email?.[0].toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{user?.email || "Attendee Account"}</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400 mt-1">
              <Shield className="h-3 w-3" /> Verified Attendee
            </span>
          </div>
        </div>

        <div className="divide-y divide-neutral-800/60 text-xs">
          <div className="py-3.5 flex items-center justify-between">
            <span className="text-neutral-400 flex items-center gap-2"><Mail className="h-4 w-4 text-neutral-500" /> Email Address</span>
            <span className="font-mono text-white">{user?.email}</span>
          </div>
          <div className="py-3.5 flex items-center justify-between">
            <span className="text-neutral-400 flex items-center gap-2"><User className="h-4 w-4 text-neutral-500" /> Account Role</span>
            <span className="font-bold text-amber-400 uppercase">Attendee / User</span>
          </div>
        </div>
      </div>

      {/* Quick Action / Logout */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-950/20 py-3.5 text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors shadow-lg"
        >
          <LogOut className="h-4 w-4" /> Sign Out of Randevu
        </button>
      </div>
    </div>
  );
};

export default YourProfilePage;
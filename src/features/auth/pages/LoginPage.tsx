import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import images from "@/assets/images";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address");
      return;
    }
    if (!trimmedPassword) {
      setError("Please enter your password");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const user = await login({ email: trimmedEmail, password: trimmedPassword });
      
      // Route based on role
      if (user?.role === "ORGANIZER") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isComplete = email.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="flex min-h-[100dvh] w-full bg-black text-white antialiased">
      {/* Left Column: Fixed desktop visual banner (matches onboarding layout) */}
      <aside className="relative hidden w-1/2 overflow-hidden border-r border-neutral-900 lg:block lg:min-h-[100dvh]">
        <img
          src={images.peoplePartying}
          alt="People partying at Randevu event"
          className="h-full w-full object-cover object-center brightness-[0.7]"
        />
        {/* Ambient Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black" />
        {/* Brand Caption */}
        <div className="absolute bottom-12 left-12 right-12 z-10 flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
            Randevu Experiences
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white xl:text-3xl">
            Welcome back. Jump right back into the vibe.
          </h2>
        </div>
      </aside>

      {/* Right Column: Dynamic login container */}
      <main className="flex min-h-[100dvh] flex-1 flex-col justify-between px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-12 lg:justify-center lg:py-12 lg:px-16 xl:px-24">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between lg:flex-initial lg:gap-10">
          {/* Top Bar Navigation */}
          <header className="flex w-full items-center justify-between py-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white active:scale-95"
            >
              Back to Home
            </button>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              Randevu
            </span>
          </header>

          {/* Form Content */}
          <div className="flex flex-1 flex-col justify-center lg:flex-initial lg:gap-8">
            <section className="flex flex-col pt-6 lg:pt-0">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Log in to your account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="mt-3 text-sm text-neutral-400"
              >
                Enter your credentials to access your events and tickets.
              </motion.p>

              <form onSubmit={handleLogin} className="mt-8 space-y-4">
                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="relative flex items-center"
                >
                  <span className="pointer-events-none absolute left-4 text-neutral-400">
                    <Mail className="h-5 w-5" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Email address"
                    autoComplete="email"
                    className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-12 pr-5 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                  />
                </motion.div>

                {/* Password Input with Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  className="relative flex items-center"
                >
                  <span className="pointer-events-none absolute left-4 text-neutral-400">
                    <Lock className="h-5 w-5" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full rounded-full border border-neutral-800 bg-neutral-900/60 py-3.5 pl-12 pr-12 text-sm font-medium text-white placeholder-neutral-500 outline-none transition-all focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 text-neutral-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 text-xs font-medium text-rose-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </section>

            {/* Create Account Link & Submit Action */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="pt-6 space-y-4"
            >
              <button
                type="button"
                onClick={handleLogin}
                disabled={!isComplete || loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/80 px-6 py-4 text-base font-semibold text-white transition-all hover:border-neutral-600 hover:bg-neutral-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Logging in..." : "Log In"}</span>
                {!loading && (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-neutral-400">
                  New here?{" "}
                  <Link
                    to="/onboarding"
                    className="font-semibold text-white underline underline-offset-4 hover:text-amber-400 transition-colors"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthContext } from "@/app/context/AuthContext";
import { ArrowRight, Mail, Lock } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrors({ submit: result.message || "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative overflow-hidden flex flex-col lg:flex-row">
      
      {/* Left Side - Branding */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-20 z-10"
      >
        <div className="max-w-xl mx-auto w-full">
          {/* Logo */}
          <Link href="/" className="flex items-start gap-4 mb-16">
            <div className="p-2.5 rounded-lg bg-primary-600 shadow-lg flex items-center justify-center w-12 h-12">
              <span className="text-2xl leading-none">🎯</span>
            </div>
            <div className="flex flex-col gap-0.5 pt-1">
              <span className="text-2xl font-bold text-primary-600 tracking-tight">AI Events</span>
              <span className="text-sm font-semibold text-primary-500 tracking-wide">Event Management Platform</span>
            </div>
          </Link>

          {/* Heading */}
          <div className="mb-10 flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-600 tracking-tight leading-tight">
              Welcome back to your events
            </h1>
            <p className="mt-2 text-base sm:text-lg font-medium text-primary-500/90 leading-relaxed max-w-md">
              Manage, organize, and track your events with AI-powered insights
            </p>
          </div>

          {/* Features List */}
          <div className="space-y-5 mt-8">
            {[
              { icon: "📊", text: "Real-time analytics & insights" },
              { icon: "🤖", text: "AI-powered event tools" },
              { icon: "🎫", text: "Seamless booking management" },
              { icon: "📈", text: "Growing attendee base" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary-50 text-primary-600 text-2xl rounded-xl border border-primary-100 shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <span className="text-primary-600 font-semibold text-lg">{feature.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 lg:p-20 z-10 bg-white dark:bg-gray-950"
      >
        <div className="w-full max-w-md mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Heading */}
            <motion.div variants={itemVariants} className="text-left">
              <h2 className="text-[32px] font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Sign in to your account to continue
              </p>
            </motion.div>

            {/* Error Alert */}
            {errors.submit && (
              <motion.div
                variants={itemVariants}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400 text-sm font-medium"
              >
                {errors.submit}
              </motion.div>
            )}

            {/* Form */}
            <motion.form onSubmit={handleSubmit} variants={itemVariants} className="space-y-5">
              {/* Email Input */}
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="name@example.com"
                icon={<Mail size={16} />}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              {/* Password Input */}
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                placeholder="••••••••"
                icon={<Lock size={16} />}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm mt-6">
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer font-medium hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                  />
                  Remember me
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-slate-900 dark:text-white font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                size="lg"
                variant="primary"
                disabled={loading}
                loading={loading}
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-950 text-slate-500">
                  or continue with
                </span>
              </div>
            </motion.div>

            {/* Social Login */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shadow-sm">
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors shadow-sm">
                <span>GitHub</span>
              </button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-2"
            >
              <p className="text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-gray-900 dark:text-white font-bold hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login attempt:", formData);
      // TODO: Redirect to dashboard on success
      // router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              AI Events
            </h1>
            <p className="text-blue-100">Login to your account</p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                autoComplete="email"
                required
              />

              {/* Password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-12 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <Link
                  href="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                text="Login"
                variant="primary"
                size="lg"
                fullWidth={true}
                loading={loading}
                type="submit"
              />
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                🔵 Login with Google
              </button>
              <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700">
                👤 Login with Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2026 AI Events Organiser. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

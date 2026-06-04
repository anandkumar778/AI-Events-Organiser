"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
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
      console.log("Registration attempt:", {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      });
      // TODO: Redirect to login on success
      // router.push("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              AI Events
            </h1>
            <p className="text-green-100">Create your account</p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <Input
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                autoComplete="name"
                required
              />

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

              {/* Phone */}
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                autoComplete="tel"
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-12 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                    autoComplete="new-password"
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
                <p className="text-xs text-gray-500 mt-1">
                  Min 8 characters, include uppercase, lowercase, and numbers
                </p>
              </div>

              {/* Confirm Password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-12 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    aria-label="Toggle password visibility"
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 rounded"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-700">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && (
                <p className="text-red-500 text-sm -mt-2">{errors.agreeTerms}</p>
              )}

              {/* Submit Button */}
              <Button
                text="Create Account"
                variant="success"
                size="lg"
                fullWidth={true}
                loading={loading}
                type="submit"
              />
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Login
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

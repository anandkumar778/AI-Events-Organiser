import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

export default function HomePage() {
  const features = [
    {
      icon: "🎯",
      title: "Easy Event Creation",
      description: "Create events in minutes with our intuitive interface",
    },
    {
      icon: "🤖",
      title: "AI-Powered Tools",
      description: "Generate titles, descriptions, budgets, and schedules with AI",
    },
    {
      icon: "📊",
      title: "Event Analytics",
      description: "Track bookings, revenue, and attendee insights",
    },
    {
      icon: "🎫",
      title: "Booking Management",
      description: "Manage bookings and attendees with ease",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              AI Events <span className="text-blue-600">Organiser</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create, Manage and Organise Events with AI-Powered Tools. Simplify
              your event planning experience with intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
            </div>

            {/* Demo Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12">
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">1000+</p>
                <p className="text-sm text-gray-600 mt-1">Events Created</p>
              </div>
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">50K+</p>
                <p className="text-sm text-gray-600 mt-1">Attendees</p>
              </div>
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">98%</p>
                <p className="text-sm text-gray-600 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose AI Events Organiser?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Ready to transform your event planning?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of event organizers using AI Events Organiser
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
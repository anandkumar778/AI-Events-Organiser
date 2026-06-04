"use client";

import Navbar from "@/app/components/layout/Navbar";
import Sidebar from "@/app/components/layout/Sidebar";
import Footer from "@/app/components/layout/Footer";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { useState } from "react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Anand Kumar",
    email: "anand@gmail.com",
    phone: "+91-9876543210",
    location: "Lucknow, India",
    bio: "Event Organizer and AI enthusiast",
  });

  const [editData, setEditData] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                My Profile
              </h1>
              <p className="text-gray-600 mt-2">Manage your profile information</p>
            </div>

            {/* Profile Card */}
            <div className="max-w-2xl">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      {profile.name}
                    </h2>
                    <p className="text-blue-100 mt-1">{profile.email}</p>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-6 sm:p-8">
                  {!isEditing ? (
                    <div>
                      {/* View Mode */}
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-semibold text-gray-600">
                            Full Name
                          </label>
                          <p className="text-lg text-gray-900 mt-1">{profile.name}</p>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-600">
                            Email Address
                          </label>
                          <p className="text-lg text-gray-900 mt-1">{profile.email}</p>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-600">
                            Phone Number
                          </label>
                          <p className="text-lg text-gray-900 mt-1">{profile.phone}</p>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-600">
                            Location
                          </label>
                          <p className="text-lg text-gray-900 mt-1">{profile.location}</p>
                        </div>

                        <div>
                          <label className="text-sm font-semibold text-gray-600">
                            Bio
                          </label>
                          <p className="text-lg text-gray-900 mt-1">{profile.bio}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                          <Button
                            text="Edit Profile"
                            variant="primary"
                            size="md"
                            fullWidth={true}
                            onClick={() => setIsEditing(true)}
                          />
                          <Button
                            text="Change Password"
                            variant="secondary"
                            size="md"
                            fullWidth={true}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Edit Mode */}
                      <div className="space-y-6">
                        <Input
                          label="Full Name"
                          name="name"
                          value={editData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />

                        <Input
                          label="Email Address"
                          name="email"
                          type="email"
                          value={editData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />

                        <Input
                          label="Phone Number"
                          name="phone"
                          value={editData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />

                        <Input
                          label="Location"
                          name="location"
                          value={editData.location}
                          onChange={handleChange}
                          placeholder="Enter your location"
                        />

                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            value={editData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none h-24"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                          <Button
                            text="Save Changes"
                            variant="success"
                            size="md"
                            fullWidth={true}
                            onClick={handleSave}
                          />
                          <Button
                            text="Cancel"
                            variant="secondary"
                            size="md"
                            fullWidth={true}
                            onClick={handleCancel}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
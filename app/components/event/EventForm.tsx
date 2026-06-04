"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    price: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    }
    if (!formData.price) {
      newErrors.price = "Price is required";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Event created:", formData);
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        capacity: "",
        price: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 sm:p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Create New Event
      </h2>

      <div className="space-y-6">
        {/* Title */}
        <Input
          label="Event Title"
          name="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        {/* Description */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none h-32 ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
            }`}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Date */}
        <Input
          label="Date & Time"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          error={errors.date}
          required
        />

        {/* Location */}
        <Input
          label="Location"
          name="location"
          placeholder="Enter event location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          required
        />

        {/* Capacity and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Capacity"
            name="capacity"
            type="number"
            placeholder="Number of attendees"
            value={formData.capacity}
            onChange={handleChange}
            error={errors.capacity}
            required
          />

          <Input
            label="Price (₹)"
            name="price"
            type="number"
            placeholder="Event price"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            text="Create Event"
            variant="success"
            size="lg"
            fullWidth={true}
            loading={loading}
            type="submit"
          />
          <Button
            text="Cancel"
            variant="secondary"
            size="lg"
            fullWidth={true}
            type="button"
            onClick={() => {
              setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                capacity: "",
                price: "",
              });
              setErrors({});
            }}
          />
        </div>
      </div>
    </form>
  );
}
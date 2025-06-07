"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

const RegistrationModal = ({ isOpen, onClose, event, fields, onRegister }) => {
  const [form, setForm] = useState(
    fields.reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {})
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await onRegister(form);
      setLoading(false);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-8 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-brand-primary"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        {!submitted ? (
          <>
            <h2 className="text-heading text-2xl mb-4 text-brand-primary">
              Register for {event.title}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.id}>
                  <label className="form-label font-semibold mb-1 block">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      className="input w-full"
                      name={field.id}
                      value={form[field.id]}
                      onChange={handleChange}
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options &&
                        field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <input
                      className="input w-full"
                      name={field.id}
                      type={field.type}
                      value={form[field.id]}
                      onChange={handleChange}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}
              <button
                type="submit"
                className="btn-primary w-full py-3 rounded-lg text-lg font-semibold shadow hover:shadow-lg transition-all"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-heading text-2xl text-brand-primary mb-2">
              Registration Successful!
            </h3>
            <p className="text-body text-lg">
              Thank you for registering for <b>{event.title}</b>.<br />
              We look forward to seeing you at the event.
            </p>
            <button className="btn-secondary mt-8" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;

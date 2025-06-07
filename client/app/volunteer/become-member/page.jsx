"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import HeroSection from "@/src/components/common/HeroSection";
import { db } from "@/src/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const BecomeMemberPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    dob: "",
    gender: "",
    emergencyName: "",
    emergencyPhone: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save form data to Firestore
      await addDoc(collection(db, "memberships"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      // Proceed to payment
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const options = {
        key: "rzp_test_oypcbnwC2SClPu", // Replace with your Razorpay key
        amount: 20000 * 100,
        currency: "INR",
        name: "Sahayata Membership",
        description: "Become a Sahayata Member for a year",
        handler: function (response) {
          setSubmitted(true);
          // Optionally, send response.razorpay_payment_id to your backend for verification
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#0ea5e9",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setLoading(false);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection
        title="Become a Member"
        description="Join Sahayata as a member and help us create a bigger impact. Membership is ₹20,000/year and supports all our initiatives."
        breadcrumb="Become Member"
      />
      <div className="flex items-center justify-center py-12 px-2">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch">
          {/* Left side photo */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2">
            <img
              src="/donation1.png"
              alt="Become a Member"
              className="rounded-l-2xl shadow-lg object-cover w-full h-full"
            />
          </div>
          {/* Right side form */}
          <div className="w-full md:w-1/2">
            <div className="card shadow-xl border border-gray-100 rounded-r-2xl bg-white/90 p-0 overflow-hidden">
              <div className="flex flex-col items-center justify-center gap-8 mb-4">
                <div className="flex flex-col items-center gap-3 pt-5">
                  <div className="flex items-center gap-2">
                    <Heart className="icon-primary text-primary" />
                    <span className="text-heading text-brand-primary text-2xl">
                      Membership Registration
                    </span>
                  </div>
                </div>
                <div className="text-center mb-2">
                  <h2 className="text-heading text-3xl mb-1">
                    Become a Sahayata Member
                  </h2>
                  <p className="text-body w-[80%] mx-auto">
                    Join Sahayata as a member and help us create a bigger
                    impact. Membership is ₹20,000/year and supports all our
                    initiatives.
                  </p>
                </div>
              </div>
              <div className="px-8 py-8">
                <button
                  className="mb-6 text-brand-primary cursor-pointer text-sm hover:text-brand-secondary transition-colors"
                  onClick={() => router.back()}
                >
                  &larr; Back
                </button>
                {!submitted ? (
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-6">
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Full Name
                        </label>
                        <input
                          className="input w-full"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleFormChange}
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Email
                        </label>
                        <input
                          className="input w-full"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleFormChange}
                          placeholder="you@email.com"
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Phone
                        </label>
                        <input
                          className="input w-full"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleFormChange}
                          placeholder="Your Phone Number"
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Address
                        </label>
                        <input
                          className="input w-full"
                          name="address"
                          type="text"
                          required
                          value={form.address}
                          onChange={handleFormChange}
                          placeholder="Your Address"
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Occupation
                        </label>
                        <input
                          className="input w-full"
                          name="occupation"
                          type="text"
                          value={form.occupation}
                          onChange={handleFormChange}
                          placeholder="Your Occupation"
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Date of Birth
                        </label>
                        <input
                          className="input w-full"
                          name="dob"
                          type="date"
                          value={form.dob || ""}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Gender
                        </label>
                        <select
                          className="input w-full"
                          name="gender"
                          value={form.gender || ""}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Emergency Contact Name
                        </label>
                        <input
                          className="input w-full"
                          name="emergencyName"
                          type="text"
                          value={form.emergencyName || ""}
                          onChange={handleFormChange}
                          placeholder="Emergency Contact Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label font-semibold mb-1 block">
                          Emergency Contact Number
                        </label>
                        <input
                          className="input w-full"
                          name="emergencyPhone"
                          type="tel"
                          value={form.emergencyPhone || ""}
                          onChange={handleFormChange}
                          placeholder="Emergency Contact Number"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label font-semibold mb-1 block">
                        Why do you want to join Sahayata?
                      </label>
                      <textarea
                        className="input w-full min-h-[48px]"
                        name="motivation"
                        value={form.motivation || ""}
                        onChange={handleFormChange}
                        placeholder="Tell us why you want to join"
                        required
                      />
                    </div>
                    <div className="flex flex-col items-center my-4">
                      <span className="text-lg font-semibold text-brand-primary">
                        Membership Fee:{" "}
                        <span className="text-2xl">₹20,000</span> / year
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full py-3 rounded-lg text-lg font-semibold shadow hover:shadow-lg transition-all"
                      disabled={
                        loading ||
                        !form.name ||
                        !form.email ||
                        !form.phone ||
                        !form.address ||
                        !form.dob ||
                        !form.gender ||
                        !form.emergencyName ||
                        !form.emergencyPhone ||
                        !form.motivation
                      }
                    >
                      {loading ? "Submitting..." : "Proceed to Payment"}
                    </button>
                  </form>
                ) : (
                  <div className="py-16 text-center">
                    <Heart className="w-14 h-14 text-brand-primary mb-4 mx-auto" />
                    <h3 className="text-heading text-2xl text-brand-primary mb-2">
                      Thank you for becoming a member!
                    </h3>
                    <p className="text-body text-lg">
                      Your membership helps us reach more people in need.
                      <br />A confirmation will be sent to your email.
                    </p>
                    <button
                      className="btn-secondary mt-8"
                      onClick={() => router.push("/volunteer")}
                    >
                      Back to Volunteer Page
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeMemberPage;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { db } from "@/src/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const GeneralDonationPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Razorpay script loader
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
    // Store donation data in Firestore
    try {
      await addDoc(collection(db, "general_donations"), {
        ...form,
        amount: Number(form.amount),
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      alert("Failed to save donation details. Please try again.");
      return;
    }
    // Load Razorpay script
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_oypcbnwC2SClPu", // Replace with your Razorpay key
      amount: Number(form.amount) * 100,
      currency: "INR",
      name: "General Donation",
      description: "Support all our initiatives and programs",
      handler: async function (response) {
        setSubmitted(true);
        // Send receipt email to donor
        try {
          console.log("Sending receipt email...");
          const emailRes = await fetch("/api/send-donation-receipt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              phone: form.phone,
              amount: form.amount,
              paymentId: response.razorpay_payment_id,
              date: new Date().toLocaleString(),
            }),
          });

          const data = await emailRes.json();
          if (!emailRes.ok) {
            throw new Error(data.error || "Failed to send receipt");
          }
          console.log("Receipt email sent successfully:", data);
        } catch (err) {
          console.error("Failed to send receipt email:", err);
          alert(
            "Payment successful but we couldn't send the receipt email. Please contact support."
          );
        }
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-2 mt-[80px]">
      <div className="w-full max-w-xl">
        <div className="card shadow-xl border border-gray-100 rounded-2xl bg-white/90 p-0 overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-8 mb-4">
            <div className="flex flex-col items-center gap-3 pt-5">
              <div className="flex items-center gap-2">
                <Heart className="icon-primary text-primary" />
                <span className="text-heading text-brand-primary text-2xl">
                  General Donation
                </span>
              </div>
            </div>
            <div className="text-center mb-2">
              <h2 className="text-heading text-3xl mb-1">
                Support Our Mission
              </h2>
              <p className="text-body w-[80%] mx-auto">
                Your contribution empowers us to provide food, education, and
                healthcare to those who need it most.
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
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Donation Amount input at top, styled to stand out */}
                <div>
                  <label className="form-label font-semibold mb-1 block text-lg text-brand-primary">
                    Donation Amount (INR)
                  </label>
                  <input
                    className="input w-full rounded-xl border-2 border-brand-primary bg-brand-primary/10 text-2xl font-bold text-brand-primary focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all mb-6 py-4 px-4 text-center placeholder:text-brand-primary/50"
                    name="amount"
                    type="number"
                    min={100}
                    required
                    value={form.amount}
                    onChange={handleFormChange}
                    placeholder="Enter amount (min 100)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label font-semibold mb-1 block">
                      Full Name
                    </label>
                    <input
                      className="input w-full rounded-lg border-2 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
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
                      className="input w-full rounded-lg border-2 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
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
                      className="input w-full rounded-lg border-2 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleFormChange}
                      placeholder="Your Phone Number"
                    />
                  </div>
                  {/* Empty div for grid alignment */}
                  <div></div>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-lg text-lg font-semibold shadow hover:shadow-lg transition-all"
                  disabled={
                    !form.name || !form.email || !form.phone || !form.amount
                  }
                >
                  Donate Now
                </button>
              </form>
            ) : (
              <div className="py-16 text-center">
                <Heart className="w-14 h-14 text-brand-primary mb-4 mx-auto" />
                <h3 className="text-heading text-2xl text-brand-primary mb-2">
                  Thank you for supporting our cause!
                </h3>
                <p className="text-body text-lg">
                  Your generosity helps us reach more people in need.
                  <br />A donation receipt will be sent to your email.
                </p>
                <button
                  className="btn-secondary mt-8"
                  onClick={() => router.push("/donate")}
                >
                  Back to Donation Page
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDonationPage;

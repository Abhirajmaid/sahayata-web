"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  MapPin,
  User,
  CreditCard,
} from "lucide-react";
import { donationData } from "@/src/data/donationData";
import { db } from "@/src/utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const locations = donationData.locations;
const thursdays = donationData.thursdays;

const LOCATION_DONATION_AMOUNT = 6000;

const DonationStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDates, setSelectedDates] = useState({}); // { [location]: dateString }
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Step 1: Select locations (multi-select)
  const handleLocationToggle = (loc) => {
    setSelectedDates((prev) => {
      const updated = { ...prev };
      if (selectedLocations.includes(loc)) delete updated[loc];
      return updated;
    });
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  // Step 2: Select date for each selected location
  const handleDateSelect = (loc, date) => {
    setSelectedDates((prev) => ({
      ...prev,
      [loc]: date,
    }));
  };

  // Step 3: Form handlers
  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const canProceed = () => {
    if (currentStep === 1) return true;
    if (currentStep === 2)
      return (
        selectedLocations.length > 0 &&
        selectedLocations.every((loc) => selectedDates[loc])
      );
    if (currentStep === 3)
      return form.name && form.email && form.phone && form.amount;
    return true;
  };

  const handleNext = () => {
    if (currentStep < 4 && canProceed()) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Update donation amount automatically based on selected locations
  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      amount: selectedLocations.length
        ? String(selectedLocations.length * LOCATION_DONATION_AMOUNT)
        : "",
    }));
  }, [selectedLocations]);

  // Step 2: Show only Thursdays that are available for all selected locations
  const getAvailableThursdaysForSelectedLocations = () => {
    // For each thursday, check if all selected locations are not booked for that date
    return thursdays
      .filter((thursday) =>
        selectedLocations.every((loc) => {
          const locStatus = thursday.locations.find((l) => l.id === loc);
          return locStatus && !locStatus.booked;
        })
      )
      .map((thursday) => thursday.date);
  };

  // Step 2: Select a Thursday for all selected locations at once
  const handleThursdaySelectForAll = (dateStr) => {
    const newDates = {};
    selectedLocations.forEach((loc) => {
      newDates[loc] = dateStr;
    });
    setSelectedDates(newDates);
  };

  // Stepper data
  const steps = [
    { label: "How Donation Works", icon: <Heart className="icon" /> },
    { label: "Select Donation Slot", icon: <Calendar className="icon" /> },
    { label: "Fill Your Details", icon: <User className="icon" /> },
    { label: "Pay (Donate)", icon: <CreditCard className="icon" /> },
  ];

  // Calendar rendering for each location (if needed elsewhere)
  const renderCalendar = (loc) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {thursdays.map((thursday, idx) => {
        const dateStr = thursday.date;
        const locStatus = thursday.locations.find((l) => l.id === loc);
        const isBooked = locStatus ? locStatus.booked : false;
        const isSelected = selectedDates[loc] === dateStr;
        return (
          <button
            key={idx}
            type="button"
            disabled={isBooked}
            onClick={() => handleDateSelect(loc, dateStr)}
            className={`select-card px-5 py-4 rounded-xl border-2 transition-all ${
              isBooked
                ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                : isSelected
                  ? "select-card-active ring-2 ring-brand-primary bg-brand-primary/10"
                  : "border-gray-200 hover:border-brand-primary"
            }`}
          >
            <span className="font-medium">{dateStr}</span>
            {isBooked && (
              <span className="mt-1 text-xs text-red-500 font-semibold block">
                Booked
              </span>
            )}
            {isSelected && !isBooked && (
              <span className="mt-1 text-xs text-brand-primary font-semibold block">
                Selected
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

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

  // On Pay & Donate, log the data and store in Firestore
  const handleDonate = async () => {
    const donationDetails = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      amount: form.amount,
      locations: selectedLocations.map((loc) => ({
        location: locations.find((l) => l.id === loc)?.label,
        date: selectedDates[loc],
      })),
      createdAt: serverTimestamp(),
    };

    // Store donation data in Firestore
    try {
      await addDoc(collection(db, "thursday_donations"), donationDetails);
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

    // Razorpay options
    const options = {
      key: "rzp_test_oypcbnwC2SClPu", // Replace with your Razorpay key
      amount: Number(form.amount) * 100, // in paise
      currency: "INR",
      name: "Thursday Food Drive",
      description: "Donation for Food Drive",
      handler: function (response) {
        setSubmitted(true);
        // Optionally, send response.razorpay_payment_id to your backend for verification
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        locations: donationDetails.locations
          .map((l) => `${l.location}: ${l.date}`)
          .join(", "),
      },
      theme: {
        color: "#0ea5e9",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center py-8 mt-[90px]">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="card p-6 mb-8 shadow-lg flex flex-col items-center gap-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="icon-primary text-primary" />
              <span className="text-heading text-brand-primary text-2xl">
                Thursday Food Drive
              </span>
            </div>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-heading text-4xl mb-1">
              Schedule Your Donation
            </h2>
            <p className="text-body w-[70%] mx-auto">
              Complete the steps below to book your Thursday food drive
              donation.
            </p>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center justify-between gap-0 mt-4 mb-2">
            {steps.map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base border-2 mb-1
                      ${
                        currentStep === idx + 1
                          ? "bg-brand-primary text-white border-brand-primary"
                          : currentStep > idx + 1
                            ? "bg-brand-primary/80 text-white border-brand-primary"
                            : "bg-white text-brand-primary border-brand-primary"
                      }
                    `}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`mt-1 text-xs font-medium text-center ${
                      currentStep === idx + 1
                        ? "text-brand-primary"
                        : "text-muted"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-1 w-8 sm:w-12 mx-1 rounded-full ${
                      currentStep > idx + 1 ? "bg-brand-primary" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="card p-6 shadow-lg">
          <button
            className="mb-6 text-brand-primary cursor-pointer text-sm hover:text-brand-secondary transition-colors"
            onClick={() => router.back()}
          >
            &larr; Back
          </button>
          {/* Step 1: How Donation Works */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-sub mb-2">How the Food Drive Works</h3>
                <p className="text-body mb-4">
                  Your donation helps us serve fresh meals to those in need
                  every Thursday at multiple locations in Pune.
                </p>
              </div>
              {/* Expanded step-by-step explanation */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg bg-brand-primary/10 p-4 flex flex-col items-center">
                  <span className="font-bold text-brand-primary text-2xl mb-1">
                    1
                  </span>
                  <span className="font-medium mb-1">Select Location(s)</span>
                  <span className="text-xs text-body text-center">
                    Choose one or more locations where you want to sponsor a
                    Thursday food drive.
                  </span>
                </div>
                <div className="rounded-lg bg-brand-secondary/10 p-4 flex flex-col items-center">
                  <span className="font-bold text-brand-secondary text-2xl mb-1">
                    2
                  </span>
                  <span className="font-medium mb-1">Pick a Thursday</span>
                  <span className="text-xs text-body text-center">
                    Select a Thursday when your chosen locations are available
                    for donation.
                  </span>
                </div>
                <div className="rounded-lg bg-brand-primary/10 p-4 flex flex-col items-center">
                  <span className="font-bold text-brand-primary text-2xl mb-1">
                    3
                  </span>
                  <span className="font-medium mb-1">Fill Your Details</span>
                  <span className="text-xs text-body text-center">
                    Enter your name, email, and phone number for confirmation
                    and receipt.
                  </span>
                </div>
                <div className="rounded-lg bg-brand-secondary/10 p-4 flex flex-col items-center">
                  <span className="font-bold text-brand-secondary text-2xl mb-1">
                    4
                  </span>
                  <span className="font-medium mb-1">Pay & Donate</span>
                  <span className="text-xs text-body text-center">
                    Complete your donation securely online. You’ll receive a
                    confirmation and can join us to serve meals!
                  </span>
                </div>
              </div>
              <div className="alert-info p-4 rounded bg-brand-primary/5 text-brand-primary text-sm mt-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Arrive 10 minutes before your slot.</li>
                  <li>Wear comfortable clothing and a mask.</li>
                  <li>Bring a valid ID for verification.</li>
                  <li>Contact us if you need to reschedule.</li>
                </ul>
              </div>
            </div>
          )}
          {/* Step 2: Select donation slot */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <label className="form-label mb-2 flex items-center">
                  <MapPin className="icon mr-2" />
                  Select Location(s)
                </label>
                <div className="flex flex-wrap gap-3">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleLocationToggle(loc.id)}
                      className={`select-card px-5 py-3 rounded-xl border-2 transition-all min-w-[110px] ${
                        selectedLocations.includes(loc.id)
                          ? "select-card-active ring-2 ring-brand-primary bg-brand-primary/10"
                          : "border-gray-200 hover:border-brand-primary"
                      }`}
                    >
                      <span className="font-medium">{loc.label}</span>
                      {selectedLocations.includes(loc.id) && (
                        <span className="mt-1 text-xs text-brand-primary font-semibold">
                          Selected
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {selectedLocations.length > 0 && (
                <div className="space-y-8 mt-6">
                  <label className="form-label mb-2 flex items-center">
                    <Calendar className="icon mr-2" />
                    Available Thursdays for all selected locations
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getAvailableThursdaysForSelectedLocations().map(
                      (dateStr, idx) => {
                        const isSelected =
                          selectedLocations.length > 0 &&
                          selectedLocations.every(
                            (loc) => selectedDates[loc] === dateStr
                          );
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleThursdaySelectForAll(dateStr)}
                            className={`select-card px-5 py-4 rounded-xl border-2 transition-all ${
                              isSelected
                                ? "select-card-active ring-2 ring-brand-primary bg-brand-primary/10"
                                : "border-gray-200 hover:border-brand-primary"
                            }`}
                          >
                            <span className="font-medium">{dateStr}</span>
                            {isSelected && (
                              <span className="mt-1 text-xs text-brand-primary font-semibold block">
                                Selected
                              </span>
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                  {/* Optionally, show a note if no common Thursdays are available */}
                  {getAvailableThursdaysForSelectedLocations().length === 0 && (
                    <div className="text-red-500 mt-4 text-center">
                      No common Thursdays available for all selected locations.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {/* Step 3: Fill Your Details */}
          {currentStep === 3 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="text-center">
                <h3 className="text-sub mb-2">Your Details</h3>
                <p className="text-body mb-4">
                  Please provide your details for confirmation and receipt.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    className="input w-full"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="input w-full"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    className="input w-full"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="form-label">Donation Amount (INR)</label>
                  <input
                    className="input w-full rounded-xl border-2 border-brand-primary bg-brand-primary/10 text-2xl font-bold text-brand-primary focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all mb-6 py-4 px-4 text-center placeholder:text-brand-primary/50"
                    name="amount"
                    type="number"
                    min={LOCATION_DONATION_AMOUNT}
                    required
                    value={form.amount}
                    readOnly
                  />
                  <div className="text-xs text-muted mt-1">
                    ₹{LOCATION_DONATION_AMOUNT} per location ×{" "}
                    {selectedLocations.length} location(s)
                  </div>
                </div>
              </div>
            </form>
          )}
          {/* Step 4: Payment Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              {!submitted ? (
                <>
                  <h3 className="text-sub mb-2">Complete Your Donation</h3>
                  <p className="text-body mb-4">
                    Please proceed to payment to confirm your donation slot.
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="card p-4 bg-brand-primary/10 inline-block">
                      <div className="mb-2">
                        <span className="font-semibold">Name:</span> {form.name}
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Email:</span>{" "}
                        {form.email}
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">Phone:</span>{" "}
                        {form.phone}
                      </div>
                      <div className="mb-2">
                        <span className="font-semibold">
                          Locations & Dates:
                        </span>
                        <ul>
                          {selectedLocations.map((loc) => (
                            <li key={loc}>
                              {locations.find((l) => l.id === loc)?.label}:{" "}
                              {selectedDates[loc]}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold">Amount:</span> ₹
                        {form.amount}
                      </div>
                    </div>
                    <button className="btn-primary mt-4" onClick={handleDonate}>
                      Pay & Donate
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-12">
                  <h3 className="text-heading text-4xl text-brand-primary mb-4">
                    Thank you for your generous donation!
                  </h3>
                  <p className="text-body">
                    Your support helps us serve more meals every Thursday. A
                    receipt will be sent to your email.
                  </p>
                  <button
                    className="btn-primary mt-4"
                    onClick={() => (window.location.href = "/donate")}
                  >
                    Back to Donation Page
                    <ChevronRight className="icon ml-2" />
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="btn-secondary flex items-center"
              >
                <ChevronLeft className="icon mr-2" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`btn-primary flex items-center ${
                  !canProceed() ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Next
                <ChevronRight className="icon ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationStepForm;

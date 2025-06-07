import { useState } from "react";
import { Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ fullName: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="card">
      <h2 className="text-heading mb-4">Get in Touch</h2>
      <p className="text-body mb-8">
        Define your goals and identify areas where AI can add value to your
        business
      </p>

      <div className="space-y-6">
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full name"
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            className="input"
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            required
            rows={5}
            className="textarea"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Sending..." : "Send a message"}</span>
        </button>
      </div>
    </div>
  );
};

export default ContactForm;

import { useState } from "react";
import { faqs } from "@/src/data/faqData";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-12 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-heading text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`card bg-white/90 shadow transition-all duration-300 ${
                openFaq === idx ? "ring-2 ring-brand-primary" : ""
              }`}
            >
              <button
                className="w-full flex justify-between items-center text-left focus:outline-none p-4"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-sub text-brand-primary">
                  {faq.question}
                </span>
                <span
                  className={`ml-4 transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="#C53030"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? "max-h-40 p-4 pt-0" : "max-h-0"
                }`}
                aria-hidden={openFaq !== idx}
              >
                <p className="text-body text-muted">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

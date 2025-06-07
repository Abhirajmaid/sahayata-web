import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { testimonials } from "@/src/data/aboutData";

const TestimonialSection = ({ bg_color }) => (
  <section className={`py-20 overflow-hidden ${bg_color}`}>
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-heading text-center mb-16">
        What People Say About Us
      </h2>
      <div className="relative">
        <div className="flex gap-8 group animate-team-slide min-w-max">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="card w-[350px] group/card hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Icon
                  icon="mdi:format-quote-open"
                  className="text-4xl text-brand-primary/20 mb-4"
                />
                <p className="text-body italic mb-6">{testimonial.quote}</p>
                <h4 className="card-title mb-1">{testimonial.author}</h4>
                <p className="text-sm text-brand-primary">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialSection;

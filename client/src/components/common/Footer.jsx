"use client";
import React from "react";
import { Icon } from "@iconify/react";

const socialLinks = [
  { href: "/", label: "Facebook", icon: "mdi:facebook" },
  { href: "/", label: "Twitter", icon: "mdi:twitter" },
  { href: "/", label: "LinkedIn", icon: "mdi:linkedin" },
  { href: "/", label: "Instagram", icon: "mdi:instagram" },
];

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Course", href: "/course" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <div className="w-full bg-white pt-16 sm:pt-20 md:pt-24">
      <div className="max-w-[95vw] md:max-w-[1400px] m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 md:px-0">
        <div className="col-span-1 flex flex-col items-start">
          <img
            src="/images/Graphic & Text (Color & Black).png"
            alt="sahayata logo"
            width={200}
            className="w-[180px] sm:w-[220px] md:w-[250px]"
          />
          <h3 className="text-xl sm:text-2xl font-bold mt-3">Contact Us</h3>
          <h3 className="py-2 text-[#6D737A] text-base sm:text-lg">
            Call : +917385XXXXXX
          </h3>
          <h3 className="py-2 text-[#6D737A] text-base sm:text-lg">
            Praesent nulla massa, hendrerit <br /> vestibulum gravida in,
            feugiat auctor felis.
          </h3>
          <h3 className="py-2 text-[#363A3D] text-base sm:text-lg">
            Email: sahayata@gmail.com
          </h3>
          <div className="flex gap-4 py-4">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label}>
                <div className="p-3 sm:p-4 bg-brand-secondary rounded-xl cursor-pointer flex items-center justify-center">
                  <Icon
                    icon={link.icon}
                    width={24}
                    height={24}
                    className="text-white"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col col-span-1 items-start justify-start text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Explore</h3>
          <ul className="flex flex-wrap flex-col sm:flex-col gap-2 sm:gap-4 items-start justify-center">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link text-base sm:text-xl">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <h3 className="text-xl sm:text-2xl font-bold">Subscribe</h3>
          <h3 className="py-2 text-[#6D737A] text-base sm:text-lg">
            Praesent nulla massa, hendrerit <br /> vestibulum gravida in,
            feugiat auctor felis.
          </h3>
          <form className="py-4">
            <input
              className="bg-brand-light p-4 w-full rounded-lg"
              placeholder="Email here"
            />
            <button className="btn-primary my-4 w-full" type="submit">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
      <div className="w-full flex justify-center bg-tag-bg pb-10 mt-10 ">
        <span className="flex flex-wrap items-center gap-1 tracking-wide text-center text-sm sm:text-base">
          Design and Develope by
          <span className="font-extrabold text-lg "> WEBFUDGE</span> ©2024-25.
        </span>
      </div>
    </div>
  );
};

export default Footer;

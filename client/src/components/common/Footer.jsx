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
    <div className="w-full bg-white pt-24">
      <div className="md:max-w-[1400px] m-auto grid md:grid-cols-3 max-[780px]:grid-cols-2  gap-8 max-w-[600px] px-4 md:px-0">
        <div className="col-span-1">
          <img
            src="/images/Graphic & Text (Color & Black).png"
            alt="sahayata logo"
            width={200}
            className=" w-[250px] "
          />
          <h3 className="text-2xl font-bold mt-3">Contact Us</h3>
          <h3 className="py-2 text-[#6D737A]">Call : +917385XXXXXX</h3>
          <h3 className="py-2 text-[#6D737A]">
            Praesent nulla massa, hendrerit <br /> vestibulum gravida in,
            feugiat auctor felis.
          </h3>
          <h3 className="py-2 text-[#363A3D]">Email: sahayata@gmail.com</h3>
          <div className="flex gap-4 py-4">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label}>
                <div className="p-4 bg-brand-secondary rounded-xl cursor-pointer flex items-center justify-center">
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
          <h3 className="text-2xl font-bold mb-4">Explore</h3>
          <ul className="flex flex-wrap flex-col sm:flex-col gap-2 sm:gap-4 items-start justify-center">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link text-xl">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-[780px]:col-span-2">
          <h3 className="text-2xl font-bold">Subscribe</h3>
          <h3 className="py-2 text-[#6D737A]">
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
        <span className="flex items-center gap-1 tracking-wide">
          Design and Develope by
          <span className="font-extrabold text-lg "> WEBFUDGE</span> ©2024-25.
        </span>
      </div>
    </div>
  );
};

export default Footer;

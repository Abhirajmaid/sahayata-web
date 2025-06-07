"use client";
import HeroSection from "@/src/components/common/HeroSection";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { blogPosts } from "@/src/data/blogData";

export default function HomePage() {
  // Pagination logic
  const POSTS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Pick the first post as the featured post
  const [featuredPost, ...otherPosts] = blogPosts;

  const paginatedPosts = otherPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(otherPosts.length / POSTS_PER_PAGE);

  // Generate slug from title
  const featuredSlug = featuredPost.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection
        title="Our Blog"
        description="Insights, stories, and updates from Sahayata. Explore our latest articles on volunteering, impact, and community."
        breadcrumb="Blog"
      />

      {/* Modern Featured Post */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="relative flex flex-col md:flex-row items-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-3xl shadow-2xl border border-brand-primary/10 overflow-hidden min-h-[340px]">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-primary/20 rounded-full blur-2xl opacity-60 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-secondary/20 rounded-full blur-2xl opacity-60 pointer-events-none" />
          <div className="relative w-full md:w-2/5 aspect-[4/3] min-h-[260px] md:min-h-[320px] flex-shrink-0">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover rounded-3xl md:rounded-none md:rounded-l-3xl shadow-lg"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            <span className="absolute top-4 left-4 bg-white/90 text-brand-primary text-xs font-semibold px-4 py-1 rounded-full shadow">
              Featured
            </span>
          </div>
          <div className="flex-1 flex flex-col p-8 md:p-12 z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-3 leading-tight drop-shadow">
              {featuredPost.title}
            </h2>
            <p className="text-body text-lg mb-6 text-brand-dark/90 line-clamp-4">
              {featuredPost.description}
            </p>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary font-bold text-xl shadow">
                {featuredPost.author[0]}
              </div>
              <div>
                <p className="text-base font-semibold text-brand-primary">
                  {featuredPost.author}
                </p>
                <p className="text-xs text-muted">{featuredPost.date}</p>
              </div>
            </div>
            <Link
              href={`/blog/${featuredSlug}`}
              className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline text-base group"
            >
              Read More
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <h2 className="text-heading text-center mb-10">Recent Blog Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedPosts.map((post, index) => {
            // Generate slug from title
            const slug = post.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return (
              <Link
                key={index + (currentPage - 1) * POSTS_PER_PAGE}
                href={`/blog/${slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-brand-primary/10 overflow-hidden flex flex-col hover:-translate-y-1 hover:scale-[1.025] duration-200"
              >
                <div className="relative aspect-[4/3] bg-brand-primary/10">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 left-3 bg-white/80 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {post.author}
                  </span>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-semibold text-xl text-brand-primary group-hover:text-brand-secondary mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-body text-base mb-4 flex-1 line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-9 h-9 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary font-bold text-lg">
                      {post.author[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-brand-primary">
                        {post.author}
                      </p>
                      <p className="text-xs text-muted">{post.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-14">
          <button
            className="pagination-btn pagination-btn-default"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &larr;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`pagination-btn ${
                currentPage === i + 1
                  ? "pagination-btn-active"
                  : "pagination-btn-default"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination-btn pagination-btn-default"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            &rarr;
          </button>
        </div>
      </section>
    </div>
  );
}

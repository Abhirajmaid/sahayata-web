"use client";
import { useParams, useRouter } from "next/navigation";
import { blogPosts } from "@/src/data/blogData";
import HeroSection from "@/src/components/common/HeroSection";
import Image from "next/image";
import Link from "next/link";

export default function BlogSinglePage() {
  const { slug } = useParams();
  const router = useRouter();
  const post = blogPosts.find(
    (p) =>
      p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  );

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-background">
        <div className="text-center">
          <h2 className="text-heading mb-4">Blog Not Found</h2>
          <button className="btn-primary" onClick={() => router.push("/blog")}>
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-background">
      <HeroSection
        title={post.title}
        description={post.description}
        breadcrumb="Blog"
      />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-brand-primary/10 overflow-hidden">
          <div className="relative w-full aspect-[4/2] min-h-[260px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-t-3xl"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary font-bold text-xl shadow">
                {post.author[0]}
              </div>
              <div>
                <p className="text-base font-semibold text-brand-primary">
                  {post.author}
                </p>
                <p className="text-xs text-muted">{post.date}</p>
              </div>
            </div>
            <h1 className="text-heading mb-4">{post.title}</h1>
            <p className="text-body text-lg mb-8">{post.description}</p>
            <div className="prose max-w-none text-body text-brand-dark">
              {Array.isArray(post.content) ? (
                post.content.map((para, idx) => <p key={idx}>{para}</p>)
              ) : (
                <p>
                  {/* ...existing code... */}
                  This is a detailed article about <b>{post.title}</b>. Here you
                  can add more paragraphs, images, and sections to provide a
                  rich reading experience.
                </p>
              )}
            </div>
            <div className="mt-10 flex justify-between items-center">
              <button
                className="btn-border"
                onClick={() => router.push("/blog")}
              >
                &larr; Back to Blog
              </button>
              <Link href="/donate" className="btn-primary">
                Support Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

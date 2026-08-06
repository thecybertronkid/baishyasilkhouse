"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogs";
import { Clock, ArrowLeft, Share2, Sparkles } from "lucide-react";

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <Link href="/blog" className="text-xs font-bold text-silk-maroon hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal Entries
        </Link>

        <div className="space-y-4 text-center">
          <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest bg-silk-gold/20 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-silk-maroon leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs text-silk-black/60 pt-2">
            <span>By {post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-silk-gold" /> {post.readTime}
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-silk-gold/30 shadow-luxury h-80">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-6 text-sm text-silk-black/80 leading-relaxed font-sans bg-silk-cream p-8 rounded-2xl border border-silk-gold/20 shadow-card">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          <div className="p-4 bg-silk-ivory rounded-lg border border-silk-gold/30 flex items-center justify-between text-xs font-bold text-silk-maroon">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-silk-gold" /> Share this heritage story
            </span>
            <div className="flex gap-3 text-silk-black/60">
              <button className="hover:text-silk-maroon">Twitter</button>
              <button className="hover:text-silk-maroon">Facebook</button>
              <button className="hover:text-silk-maroon">WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

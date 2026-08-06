"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blogs";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

export default function BlogListPage() {
  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest">
            THE HERITAGE JOURNAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon flex items-center justify-center gap-2">
            <BookOpen className="w-7 h-7 text-silk-gold" /> Stories of Indian Silk Craft
          </h1>
          <p className="text-xs text-silk-black/70">
            Explore articles on Muga sericulture, silk identification, and Assamese weaving history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-silk-cream rounded-xl overflow-hidden border border-silk-gold/30 shadow-card flex flex-col justify-between hover:shadow-luxury transition duration-300"
            >
              <div className="space-y-4">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-silk-maroon text-silk-gold text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-silk-black/60">
                    <Clock className="w-3.5 h-3.5 text-silk-gold" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-silk-black line-clamp-2">{post.title}</h3>
                  <p className="text-xs text-silk-black/70 line-clamp-3">{post.excerpt}</p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-silk-maroon hover:text-silk-gold transition"
                >
                  Read Journal Entry <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

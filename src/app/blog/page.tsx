import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import { BlogService } from '@/lib/data-store';

export const metadata: Metadata = {
  title: 'Real Estate Insights, Research & Buyer Guides | L2H Solution',
  description: 'Unbiased market analysis, micro-market pricing trends, ROI forecasts, and buyer guides for Delhi NCR, Noida Expressway, and Gurgaon real estate.',
  keywords: [
    'Delhi NCR real estate news',
    'Noida vs Gurgaon investment analysis',
    'Jewar Airport real estate impact',
    'Pre-leased commercial real estate NCR',
    'L2H Solution market intelligence'
  ],
  alternates: {
    canonical: 'https://l2hsolution.com/blog',
  },
  openGraph: {
    title: 'Real Estate Insights & Analysis — L2H Solution',
    description: 'Data-backed research reports, micro-market infrastructure updates, and legal guides across Delhi NCR.',
    url: 'https://l2hsolution.com/blog',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80']
  }
};

export default function BlogPage() {
  const posts = BlogService.getAll();

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://l2hsolution.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Insights & Journal',
            item: 'https://l2hsolution.com/blog'
          }
        ]
      },
      {
        '@type': 'Blog',
        '@id': 'https://l2hsolution.com/blog#blog',
        name: 'L2H Solution Real Estate Insights',
        description: 'Macro research, price trends, and infrastructure updates across Delhi NCR.',
        publisher: {
          '@type': 'Organization',
          name: 'L2H Solution',
          url: 'https://l2hsolution.com'
        },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `https://l2hsolution.com/blog/${p.slug}`,
          datePublished: p.publishedAt,
          author: {
            '@type': 'Person',
            name: p.author.name
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Research &amp; Advisory Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
            Real Estate Insights &amp; Analysis
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            Data-backed reports, micro-market infrastructure updates, rental yield studies, and legal buyer guides across Delhi NCR.
          </p>
        </div>

        {/* Featured First Article Hero */}
        {posts.length > 0 && (
          <div className="bg-[#09090b] text-white rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-6 h-72 sm:h-96 relative overflow-hidden">
                <img
                  src={posts[0].coverImage}
                  alt={posts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-black/90 text-white border border-white/20 backdrop-blur-md">
                  {posts[0].category}
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
                <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
                  Featured Intelligence Report • {posts[0].readTime}
                </div>

                <Link href={`/blog/${posts[0].slug}`} className="block">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-zinc-300 transition-colors leading-tight">
                    {posts[0].title}
                  </h2>
                </Link>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                  {posts[0].excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-zinc-400">
                    By <span className="text-white font-medium">{posts[0].author.name}</span>
                  </div>

                  <Link
                    href={`/blog/${posts[0].slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:underline transition-colors"
                  >
                    <span>Read Full Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:border-black transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="h-52 w-full overflow-hidden bg-black relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/90 text-white border border-white/20 backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[11px] text-zinc-400 font-medium">
                    {post.readTime} • {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-lg font-serif font-bold text-zinc-950 group-hover:underline transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-zinc-100 flex items-center justify-between">
                <div className="text-xs text-zinc-500 font-medium truncate">
                  By {post.author.name}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-zinc-950 hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

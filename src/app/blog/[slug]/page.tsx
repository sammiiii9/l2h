import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowLeft, ArrowRight, Calendar, User, Clock, Share2 } from 'lucide-react';
import { BlogService } from '@/lib/data-store';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }> | {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = BlogService.getBySlug(resolvedParams.slug);
  if (!post) return { title: 'Article Not Found — L2H Solution' };

  const canonicalUrl = `https://l2hsolution.com/blog/${post.slug}`;

  return {
    title: `${post.title} | L2H Solution Real Estate Insights`,
    description: post.excerpt,
    keywords: [
      post.title,
      post.category,
      ...(post.tags || []),
      'Delhi NCR real estate analysis',
      'L2H Solution research'
    ],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    }
  };
}

export default async function BlogPostDetail({ params }: BlogPostPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const post = BlogService.getBySlug(resolvedParams.slug);
  if (!post) notFound();

  const allPosts = BlogService.getAll();
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 2);
  const canonicalUrl = `https://l2hsolution.com/blog/${post.slug}`;

  // Article JSON-LD Schema
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
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.coverImage,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.role,
          image: post.author.avatar
        },
        publisher: {
          '@type': 'Organization',
          name: 'L2H Solution',
          url: 'https://l2hsolution.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        articleSection: post.category,
        keywords: post.tags?.join(', ')
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Back Link & Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <Link href="/" className="hover:text-zinc-950 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-zinc-950 transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-zinc-950 font-semibold truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-semibold uppercase tracking-wider">
              <span>{post.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-2 border-b border-zinc-200 pb-6">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={post.author.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-black"
              />
              <span className="font-semibold text-zinc-950">{post.author.name}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-zinc-200 h-[380px] sm:h-[480px] bg-black">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-sm space-y-6 text-zinc-950 text-sm sm:text-base leading-relaxed font-light">
          <div className="prose max-w-none text-zinc-800 space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 pt-4 pb-2">{paragraph.replace('# ', '')}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-zinc-950 pt-3 pb-1">{paragraph.replace('## ', '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={idx} className="space-y-2 pl-4 list-disc text-zinc-700">
                    {items.map((item, iIdx) => (
                      <li key={iIdx}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx} className="text-zinc-700 leading-relaxed font-light">{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-zinc-100 flex flex-wrap gap-2">
            {post.tags.map((tag, tIdx) => (
              <span key={tIdx} className="px-3 py-1 rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-700 border border-zinc-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Advisory Consultation Callout */}
        <div className="bg-[#09090b] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-white">
              Need Personal Guidance on This Corridor?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-lg leading-relaxed font-light">
              Schedule a confidential strategy call with an L2H property advisor to evaluate matching properties.
            </p>
          </div>

          <Link
            href="/find-property"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider transition-colors shrink-0 text-center shadow-md"
          >
            Consult an Advisor
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 space-y-6">
            <h3 className="text-2xl font-serif font-bold text-zinc-950">
              Related Research Reports
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blog/${rPost.slug}`}
                  className="bg-white rounded-2xl p-6 border border-zinc-200 hover:border-black shadow-sm transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{rPost.category}</span>
                    <h4 className="font-serif font-bold text-zinc-950 group-hover:underline transition-colors line-clamp-2">
                      {rPost.title}
                    </h4>
                  </div>
                  <div className="text-xs text-zinc-400">
                    {rPost.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

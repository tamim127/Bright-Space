import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { blogsData } from "@/data/blogs";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = blogsData.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-6 md:px-12 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9A9A9A] hover:text-[#00E5FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/40 rounded-full text-xs font-mono">
            {post.category}
          </span>
          <span className="text-xs font-mono text-[#5A5A66] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span className="text-xs font-mono text-[#5A5A66] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.date}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Author Badge */}
        <div className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[rgba(255,255,255,0.15)]">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{post.author.name}</h4>
            <p className="text-xs font-mono text-[#5A5A66]">{post.author.role}</p>
          </div>
        </div>
      </div>

      {/* Main Feature Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-panel border border-[rgba(255,255,255,0.1)]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none text-[#9A9A9A] leading-relaxed space-y-6 text-base font-light">
        <p className="text-lg text-white font-normal leading-relaxed">{post.excerpt}</p>
        <div className="whitespace-pre-line">{post.content}</div>
      </div>
    </div>
  );
}

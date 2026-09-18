import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { projectsData } from "@/data/projects";

interface CaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { id } = await params;
  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject =
    projectsData[(projectIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject =
    projectsData[(projectIndex + 1) % projectsData.length];

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-20">
      {/* Back Link */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9A9A9A] hover:text-[#00E5FF] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio Archive
        </Link>
      </div>

      {/* Case Study Hero */}
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-[#6C63FF]/20 text-[#6C63FF] border border-[#6C63FF]/40 rounded-full text-xs font-mono">
            {project.category}
          </span>
          <span className="text-xs font-mono text-[#9A9A9A]">{project.subcategory}</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
          {project.title}
        </h1>

        <p className="text-xl text-[#9A9A9A] font-light max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Project Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 glass-panel rounded-2xl border border-[rgba(255,255,255,0.08)]">
          <div>
            <span className="text-[11px] font-mono text-[#5A5A66] uppercase block">Client</span>
            <span className="text-sm font-semibold text-white">{project.client}</span>
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#5A5A66] uppercase block">Timeline</span>
            <span className="text-sm font-semibold text-white">{project.timeline}</span>
          </div>
          <div className="col-span-2">
            <span className="text-[11px] font-mono text-[#5A5A66] uppercase block">Core Deliverables</span>
            <span className="text-sm font-semibold text-[#00E5FF]">
              {project.servicesProvided.join(" • ")}
            </span>
          </div>
        </div>

        {/* Main Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden glass-panel border border-[rgba(255,255,255,0.1)] shadow-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Overview — Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.08)] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-mono font-bold text-xs">
            01
          </div>
          <h3 className="text-2xl font-bold text-white">The Challenge</h3>
          <p className="text-[#9A9A9A] leading-relaxed text-base font-light">
            {project.challenge}
          </p>
        </div>

        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-[rgba(108,99,255,0.3)] space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/30 flex items-center justify-center text-[#00E5FF] font-mono font-bold text-xs">
            02
          </div>
          <h3 className="text-2xl font-bold text-white">The Solution</h3>
          <p className="text-[#9A9A9A] leading-relaxed text-base font-light">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Project Goals */}
      <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-white">Core Project Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.goals.map((goal, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-[rgba(255,255,255,0.06)] flex items-center gap-4"
            >
              <CheckCircle className="w-6 h-6 text-[#00E5FF] shrink-0" />
              <span className="text-base text-white font-medium">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Results & Metrics */}
      <div className="p-10 md:p-12 rounded-3xl bg-gradient-to-r from-[#0c0c14] to-[#07070c] border border-[rgba(108,99,255,0.3)] space-y-8">
        <h2 className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest">
          {"/// MEASURABLE IMPACT"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {project.results.map((res, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-4xl md:text-5xl font-black text-white font-mono">
                <span className="text-gradient-accent">{res.value}</span>
              </div>
              <p className="text-sm text-[#9A9A9A] font-mono">{res.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Used */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Technologies & Architecture</h3>
        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-[#0c0c10] rounded-xl text-xs font-mono text-white border border-[rgba(255,255,255,0.1)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Next / Previous Project Navigation */}
      <div className="border-t border-[rgba(255,255,255,0.08)] pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href={`/work/${prevProject.id}`}
          className="group glass-panel p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF] w-full md:w-auto min-w-[280px]"
        >
          <span className="text-[11px] font-mono text-[#5A5A66] uppercase block">← Previous Project</span>
          <span className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
            {prevProject.title}
          </span>
        </Link>

        <Link
          href={`/work/${nextProject.id}`}
          className="group glass-panel p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] hover:border-[#6C63FF] w-full md:w-auto min-w-[280px] text-right"
        >
          <span className="text-[11px] font-mono text-[#5A5A66] uppercase block">Next Project →</span>
          <span className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors">
            {nextProject.title}
          </span>
        </Link>
      </div>
    </div>
  );
}

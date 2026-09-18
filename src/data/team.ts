export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export const teamData: TeamMember[] = [
  {
    id: "alex-vance",
    name: "Alex Vance",
    role: "Founder & Lead Architect",
    bio: "10+ years engineering scalable cloud software and digital products for high-growth tech startups.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    socials: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Head of Product Design",
    bio: "Passionate about dark minimal luxury aesthetics, design systems, and fluid micro-interactions.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Senior Full-Stack Engineer",
    bio: "Specializes in Next.js, Node.js microservices, real-time web sockets, and database optimization.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    socials: {
      linkedin: "#",
      github: "#"
    }
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "UX Researcher & Strategist",
    bio: "Translates complex business workflows into seamless, conversion-focused user journeys.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

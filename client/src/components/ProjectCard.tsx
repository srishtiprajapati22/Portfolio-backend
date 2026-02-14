import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { type Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group"
    >
      <div className="relative h-48 overflow-hidden bg-slate-800">
        {/* Placeholder gradient background if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-500" />
        
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }} 
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold font-display text-white/10 group-hover:text-white/20 transition-colors uppercase tracking-widest">
            {project.category.split('/')[0]}
          </h3>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(0,245,255,0.3)]">
            FEATURED
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-xs font-mono text-primary mb-2 block">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span 
                key={tech} 
                className="text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-700 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-xs font-medium text-slate-500 px-2 py-1">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
              >
                {project.link.includes('github') ? <Github size={16} /> : <ExternalLink size={16} />}
                View Project
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

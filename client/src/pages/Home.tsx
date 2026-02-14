import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "typewriter-effect";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ChevronDown, 
  Cpu, 
  Code2, 
  Brain,
  GraduationCap,
  Trophy,
  Send
} from "lucide-react";
import { SiPython, SiCplusplus, SiReact, SiTensorflow, SiOpencv } from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillCard } from "@/components/SkillCard";
import { useProjects, useSkills, useEducation, useAchievements, useCreateInquiry } from "@/hooks/use-portfolio";
import { insertInquirySchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// --- Hero Section ---
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-primary text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tight leading-tight">
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Srishti Prajapati
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-slate-400 mb-8 font-light h-[60px]">
            <Typewriter
              options={{
                strings: [
                  "AI & Computer Vision Enthusiast",
                  "Python & C++ Developer",
                  "Hackathon Finalist",
                  "Tech Explorer"
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed">
            Crafting intelligent solutions at the intersection of AI and software engineering. 
            Passionate about Computer Vision and building systems that perceive the world.
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] flex items-center gap-2"
            >
              Let's Talk <Send size={18} />
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-transparent border border-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 group"
            >
              Resume <Download size={18} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <SocialLink href="https://github.com/srishtiprajapati22" icon={<Github />} />
            <SocialLink href="https://linkedin.com/in/srishtiprajapati" icon={<Linkedin />} />
            <SocialLink href="mailto:srishtiprajapati.work@gmail.com" icon={<Mail />} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:flex justify-center items-center"
        >
          <div className="relative w-[500px] h-[500px]">
            {/* Abstract Tech Visualization */}
            <div className="absolute inset-0 border border-slate-800 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-[10%] border border-slate-800/50 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-[20%] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
            
            {/* Central glowing core */}
            <div className="absolute inset-0 m-auto w-32 h-32 bg-gradient-to-br from-primary to-blue-600 rounded-full blur-[60px] opacity-50 animate-pulse" />
            
            {/* Floating Icons */}
            <FloatingIcon icon={<SiPython size={40} />} className="top-[20%] left-[20%] text-yellow-400" delay={0} />
            <FloatingIcon icon={<SiCplusplus size={40} />} className="top-[20%] right-[20%] text-blue-500" delay={1} />
            <FloatingIcon icon={<SiReact size={40} />} className="bottom-[20%] left-[20%] text-cyan-400" delay={2} />
            <FloatingIcon icon={<Brain size={40} />} className="bottom-[20%] right-[20%] text-primary" delay={3} />
            <FloatingIcon icon={<SiTensorflow size={40} />} className="top-[50%] right-[10%] text-orange-500" delay={1.5} />
            <FloatingIcon icon={<SiOpencv size={40} />} className="top-[50%] left-[10%] text-green-500" delay={2.5} />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl relative z-10">
                {/* 
                  Using a stylized avatar placeholder since user didn't provide a photo.
                  In production, this would be the user's headshot.
                */}
                <div className="w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 flex items-center justify-center">
                  <span className="text-4xl font-bold text-slate-500">SP</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FloatingIcon({ icon, className, delay }: { icon: React.ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      className={`absolute p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-xl ${className}`}
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {icon}
    </motion.div>
  );
}

// --- About ---
function About() {
  const { data: education, isLoading } = useEducation();

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="About Me" subtitle="WHO I AM" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Cpu className="text-primary" /> The Developer
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              I am a second year B.Tech Computer Science student at Banasthali Vidyapith. 
              My journey in tech is driven by a curiosity to understand how machines perceive the world.
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              As an AI & Computer Vision enthusiast, I enjoy building intelligent systems that solve real-world problems. 
              Whether it's optimizing algorithms in C++ or training models in Python, I'm always eager to learn and innovate.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap className="text-primary" /> Education
            </h3>
            
            <div className="space-y-8 pl-4 border-l-2 border-slate-800 relative">
              {isLoading ? (
                <p className="text-slate-500">Loading education...</p>
              ) : (
                education?.map((edu, index) => (
                  <motion.div 
                    key={edu.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -left-[21px] top-0 w-4 h-4 rounded-full bg-slate-900 border-2 border-primary" />
                    <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
                      <span className="text-primary text-sm font-mono mb-2 block">{edu.year}</span>
                      <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                      <p className="text-slate-300 mb-2">{edu.institution}</p>
                      {edu.grade && (
                        <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-400">
                          {edu.grade}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Skills Section ---
import { ChevronLeft, ChevronRight } from "lucide-react";

function Skills() {
  const { data: skills, isLoading } = useSkills();
  const [activeSlide, setActiveSlide] = useState(0);

  const categories = ["Languages", "Frameworks", "Libraries", "Tools"];
  
  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % categories.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + categories.length) % categories.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const filteredSkills = skills?.filter(s => {
    if (activeSlide === 0) return s.category === "Languages";
    if (activeSlide === 1) return s.category === "Frameworks";
    if (activeSlide === 2) return s.category === "Libraries";
    if (activeSlide === 3) return s.category === "Tools";
    return false;
  });

  return (
    <section id="skills" className="py-20 md:py-32 bg-[#080c17] relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="Technical Arsenal" subtitle="MY SKILLS" />

        <div className="max-w-4xl mx-auto relative group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-mono">
                    0{activeSlide + 1}
                  </span>
                  {categories[activeSlide]}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {isLoading ? (
                    [1,2,3,4].map(i => <div key={i} className="h-20 bg-slate-800 animate-pulse rounded-xl" />)
                  ) : (
                    filteredSkills?.map((skill, index) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-8">
            {categories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all ${
                  activeSlide === i ? "w-8 bg-primary shadow-[0_0_10px_rgba(0,245,255,0.5)]" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Projects Section ---
function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % (projects?.length || 1));
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + (projects?.length || 1)) % (projects?.length || 1));

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="Featured Work" subtitle="PROJECTS" />

        <div className="max-w-5xl mx-auto relative group">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="h-[400px] bg-slate-800 animate-pulse rounded-3xl" />
            ) : (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {projects && projects[activeIndex] && (
                  <div className="glass-card rounded-[2rem] overflow-hidden border border-white/10 flex flex-col md:flex-row min-h-[450px]">
                    <div className="md:w-1/2 relative bg-slate-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                      <div className="absolute inset-0 opacity-20" 
                           style={{ 
                             backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                             backgroundSize: '24px 24px'
                           }} 
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-12">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-center"
                        >
                          <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-6 shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                            <Code2 size={40} />
                          </div>
                          <span className="text-sm font-mono text-primary uppercase tracking-[0.2em]">{projects[activeIndex].category}</span>
                        </motion.div>
                      </div>
                    </div>

                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px]" />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                          {projects[activeIndex].title}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                          {projects[activeIndex].description}
                        </p>

                        <div className="flex flex-wrap gap-3 mb-10">
                          {projects[activeIndex].techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className="text-xs font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-6">
                          <a 
                            href={projects[activeIndex].link || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white hover:text-primary transition-all font-semibold group"
                          >
                            <Github size={20} className="group-hover:rotate-12 transition-transform" />
                            View Source Code
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-8">
             <button 
              onClick={prevProject}
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {projects?.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === i ? "w-10 bg-primary" : "w-2 bg-slate-800"
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextProject}
              className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Achievements ---
function Achievements() {
  const { data: achievements, isLoading } = useAchievements();

  return (
    <section id="achievements" className="py-20 md:py-32 bg-[#080c17]">
      <div className="container mx-auto px-4">
        <SectionHeading title="Honors & Awards" subtitle="ACHIEVEMENTS" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {isLoading ? (
            <p className="text-center text-slate-500">Loading...</p>
          ) : (
            achievements?.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 glass-card rounded-xl border border-white/5 group hover:bg-white/5 transition-colors relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-yellow-500/10 p-3 rounded-lg text-yellow-500 group-hover:bg-yellow-500/20 transition-colors relative z-10">
                  <Trophy size={24} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">{achievement.title}</h4>
                  <p className="text-slate-400 text-sm">{achievement.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="Connect With Me" subtitle="CONTACT" />

        <div className="grid md:grid-cols-3 gap-8">
          <ContactCard 
            title="LinkedIn" 
            value="in/srishtiprajapati" 
            href="https://linkedin.com/in/srishtiprajapati"
            icon={<Linkedin size={32} />}
            delay={0.1}
          />
          <ContactCard 
            title="GitHub" 
            value="srishtiprajapati22" 
            href="https://github.com/srishtiprajapati22"
            icon={<Github size={32} />}
            delay={0.2}
          />
          <ContactCard 
            title="Email" 
            value="srishtiprajapati.work@gmail.com" 
            href="mailto:srishtiprajapati.work@gmail.com"
            icon={<Mail size={32} />}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ title, value, href, icon, delay }: { title: string; value: string; href: string; icon: React.ReactNode; delay: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-10 rounded-[2rem] border border-white/5 flex flex-col items-center text-center group hover:border-primary/50 transition-all hover:-translate-y-2 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.2)] transition-all mb-6 relative z-10">
        {icon}
      </div>
      
      <div className="relative z-10">
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <p className="text-slate-500 font-mono text-sm break-all">{value}</p>
      </div>
      
      <div className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/5 text-xs font-bold text-slate-400 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
        OPEN LINK
      </div>
    </motion.a>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-sm">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} Srishti Prajapati. All rights reserved.</p>
        <p className="mt-2 text-xs">Built with React, Tailwind, & AI Magic ✨</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-foreground font-sans selection:bg-primary/30">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

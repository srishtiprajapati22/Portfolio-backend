import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const projects = await storage.getProjects();
  if (projects.length === 0) {
    await storage.createProject({
      title: "TraceLens",
      description: "Open-source OSINT image intelligence platform with metadata extraction, OCR, AI-generated image detection, perceptual hashing, and reverse image search.",
      techStack: ["Python", "JavaScript", "HTML", "CSS", "Docker"],
      category: "AI/ML",
      link: "https://github.com/srishtiprajapati22",
      featured: true
    });
    await storage.createProject({
      title: "Vision-Based Drone Feed Analysis System",
      description: "AI-powered drone surveillance system for intrusion detection and abnormal activity prediction using deep learning models.",
      techStack: ["Python", "OpenCV", "TensorFlow (Keras)", "Flask"],
      category: "Computer Vision",
      link: "https://github.com/srishtiprajapati22",
      featured: true
    });
  }

  const skills = await storage.getSkills();
  if (skills.length === 0) {
    const skillData = [
      { name: "C", category: "Languages", proficiency: 90 },
      { name: "C++", category: "Languages", proficiency: 90 },
      { name: "Python", category: "Languages", proficiency: 95 },
      { name: "SQL", category: "Languages", proficiency: 85 },
      { name: "JavaScript", category: "Languages", proficiency: 80 },
      { name: "Flask", category: "Frameworks", proficiency: 85 },
      { name: "FastAPI", category: "Frameworks", proficiency: 80 },
      { name: "React (Basic)", category: "Frameworks", proficiency: 60 },
      { name: "OpenCV", category: "Libraries", proficiency: 90 },
      { name: "TensorFlow", category: "Libraries", proficiency: 85 },
      { name: "Pandas", category: "Libraries", proficiency: 90 },
      { name: "NumPy", category: "Libraries", proficiency: 90 },
      { name: "Git/GitHub", category: "Tools", proficiency: 90 },
      { name: "Docker", category: "Tools", proficiency: 80 },
      { name: "Google Cloud", category: "Tools", proficiency: 75 },
      { name: "VS Code", category: "Tools", proficiency: 95 },
    ];
    for (const skill of skillData) {
      await storage.createSkill(skill);
    }
  }

  const education = await storage.getEducation();
  if (education.length === 0) {
    await storage.createEducation({
      degree: "B.Tech in Computer Science",
      institution: "Banasthali Vidyapith",
      year: "2024–2028",
      grade: "CGPA: 9.20/10"
    });
  }

  const achievements = await storage.getAchievements();
  if (achievements.length === 0) {
    await storage.createAchievement({
      title: "Hack with Rajasthan",
      description: "Ranked among Top 53 teams out of 250+ teams."
    });
    await storage.createAchievement({
      title: "Smart India Hackathon",
      description: "Selected for internal rounds."
    });
    await storage.createAchievement({
      title: "Active Hackathon Participant",
      description: "Continuously building solutions for real-world problems."
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  await seedDatabase();

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await db.query.projects.findFirst({
      where: (projects, { eq }) => eq(projects.id, Number(req.params.id))
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.achievements.list.path, async (_req, res) => {
    const achievements = await storage.getAchievements();
    res.json(achievements);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      await storage.createInquiry(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}

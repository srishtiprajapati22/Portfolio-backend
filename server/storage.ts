import { 
  projects, skills, education, achievements, inquiries,
  type Project, type InsertProject,
  type Skill, type InsertSkill,
  type Education, type InsertEducation,
  type Achievement, type InsertAchievement,
  type Inquiry, type InsertInquiry
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;

  // Education
  getEducation(): Promise<Education[]>;
  createEducation(edu: InsertEducation): Promise<Education>;

  // Achievements
  getAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;

  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [edu] = await db.insert(education).values(insertEducation).returning();
    return edu;
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const [ach] = await db.insert(achievements).values(insertAchievement).returning();
    return ach;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }
}

export const storage = new DatabaseStorage();

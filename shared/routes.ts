import { z } from 'zod';
import { 
  insertProjectSchema, 
  insertSkillSchema, 
  insertEducationSchema, 
  insertAchievementSchema,
  insertInquirySchema,
  projects,
  skills,
  education,
  achievements
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects' as const,
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id' as const,
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills' as const,
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    }
  },
  education: {
    list: {
      method: 'GET' as const,
      path: '/api/education' as const,
      responses: {
        200: z.array(z.custom<typeof education.$inferSelect>()),
      },
    }
  },
  achievements: {
    list: {
      method: 'GET' as const,
      path: '/api/achievements' as const,
      responses: {
        200: z.array(z.custom<typeof achievements.$inferSelect>()),
      },
    }
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertInquirySchema,
      responses: {
        201: z.object({ success: z.boolean(), message: z.string() }),
        400: errorSchemas.validation,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

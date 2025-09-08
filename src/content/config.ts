import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url(),
    codeFiles: z.array(z.string()).optional(),
    cover: z.string().optional(),
    images: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
    publishedAt: z.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};


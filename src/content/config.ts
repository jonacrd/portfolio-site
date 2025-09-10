import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url(),
    branch: z.string().default("main"),
    codeFiles: z.array(z.string()).default(["README.md"]),
    cover: z.string().optional(),
    images: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    publishedAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
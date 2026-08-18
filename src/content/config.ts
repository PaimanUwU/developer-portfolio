import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    status: z.enum(['halt', 'working', 'finished']),
    stack: z.array(z.string()),
    description: z.string(),
    bio: z.string(),
    role: z.string(),
    experience: z.string(),
    location: z.string(),
    image: z.string().optional(),
    github: z.string().url().optional(),
  }),
});

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { works, blog };

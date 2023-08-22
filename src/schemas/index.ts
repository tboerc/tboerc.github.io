import { z } from 'astro:content'

export const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	image: z.object({
		src: z.string(),
		alt: z.string()
	}),
	language: z.enum(['en', 'pt']),
	featured: z.boolean().optional(),
	tags: z.array(z.string()).optional(),
	publishDate: z.date()
})

export type BlogSchema = z.infer<typeof blogSchema>

export const workSchema = z.object({
	role: z.string(),
	company: z.object({
		title: z.string(),
		href: z.string()
	}),
	period: z.object({
		from: z.date(),
		to: z.string().or(z.date())
	}),
	location: z.string(),
	description: z.array(z.string())
})

export type WorkSchema = z.infer<typeof workSchema>

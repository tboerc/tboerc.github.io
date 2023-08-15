import { z } from 'astro:content'

export const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	image: z.object({
		src: z.string(),
		alt: z.string()
	}),
	language: z.enum(['en', 'pt']),
	tags: z.array(z.string()).optional(),
	publishDate: z.date()
})

export type BlogSchema = z.infer<typeof blogSchema>

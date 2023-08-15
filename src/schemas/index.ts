import { z } from 'astro:content'

export const blogSchema = z.object({
	title: z.string(),
	description: z.string(),
	language: z.enum(['en', 'pt']),
	publishDate: z.date()
})

export type BlogSchema = z.infer<typeof blogSchema>

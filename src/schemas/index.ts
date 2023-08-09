import { z, type SchemaContext } from 'astro:content'

export const blogSchema = ({ image }: SchemaContext) =>
	z.object({
		title: z.string(),
		description: z.string(),
		image: image(),
		imageAlt: z.string(),
		language: z.enum(['en', 'pt']),
		featured: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		publishDate: z.date()
	})

export const workExperienceSchema = z.object({
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

export const educationSchema = z.object({
	title: z.string(),
	type: z.enum(['degree', 'certificate']),
	subtitle: z.string(),
	date: z.date().optional(),
	url: z.string().optional(),
	period: z.object({ from: z.date(), to: z.date() }).optional(),
	description: z.string().optional()
})

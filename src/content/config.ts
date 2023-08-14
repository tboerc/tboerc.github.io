import { defineCollection } from 'astro:content'
import { blogSchema } from '@schemas/index'

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema
})

export const collections = {
	blog: blogCollection
}

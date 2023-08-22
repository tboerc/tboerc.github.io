import { defineCollection } from 'astro:content'
import { blogSchema, workSchema } from '@schemas/index'

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema
})

const workCollection = defineCollection({
	type: 'data',
	schema: workSchema
})

export const collections = {
	blog: blogCollection,
	'work-experience': workCollection
}

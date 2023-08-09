import { defineCollection } from 'astro:content'
import { blogSchema, workExperienceSchema, educationSchema } from '@schemas/index'

const blogCollection = defineCollection({
	type: 'content',
	schema: blogSchema
})

const workCollection = defineCollection({
	type: 'data',
	schema: workExperienceSchema
})

const educationCollection = defineCollection({
	type: 'data',
	schema: educationSchema
})

export const collections = {
	blog: blogCollection,
	education: educationCollection,
	'work-experience': workCollection
}

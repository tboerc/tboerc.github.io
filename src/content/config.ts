import {
  blogSchema,
  workExperienceSchema,
  educationSchema,
} from "@schemas/index";
import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

const workCollection = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/work-experience" }),
  schema: workExperienceSchema,
});

const educationCollection = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/education" }),
  schema: educationSchema,
});

export const collections = {
  blog: blogCollection,
  education: educationCollection,
  "work-experience": workCollection,
};

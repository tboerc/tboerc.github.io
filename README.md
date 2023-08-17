# tboerc.github.io

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── content/
│   │   └── blog/
│   ├── i18n/
│   ├── layouts/
│   ├── pages/
│   └── schemas/
└── package.json
```

Astro looks for `.astro` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Astro will also look for `.md` files inside `src/content/blog/` directory. Each file will become a blog post.

There's nothing special about `src/components/`, but that's where we like to put any Astro components.

All the internationalization stuff lives inside the `src/i18n/` directory. There we can find some helpers functions and some `.json` files containing all translated strings used in the site.

There are some validation in the frontmatter of blog posts, and `src/schemas` holds the files containing it.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build).

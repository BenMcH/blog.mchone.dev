# Copilot Instructions for blog.mchone.dev

## Project Overview

Personal tech blog built with Eleventy (11ty) v2.x and styled with Tailwind CSS v3.x. The site generates static HTML from Liquid templates and markdown blog posts.

## Architecture

**Build Pipeline:**
- Input: `src/` → Processing: Eleventy + Tailwind → Output: `_site/`
- Tailwind compiles `src/tailwind-starter.css` → `src/public/tailwind.css`
- Eleventy processes templates/markdown → HTML in `_site/`
- All files in `src/public/` pass through to root of `_site/` (images, CSS, etc.)

**Key Directories:**
- `src/blog/` - Blog post markdown files with frontmatter
- `src/_includes/` - Liquid layout templates (layout.liquid, post-layout.liquid)
- `src/public/` - Static assets that copy to site root
- `_site/` - Generated static site (git-ignored)

## Development Workflow

**Start dev server:**
```bash
npm run dev  # Runs Tailwind watch + Eleventy serve concurrently
```

**Production build:**
```bash
npm run build  # Builds CSS then builds site
```

**Commands breakdown:**
- `build:css` - Compiles Tailwind CSS from `tailwind-starter.css`
- `build:site` - Runs Eleventy to generate static site

## Content Patterns

**Blog Post Structure:**
- File naming: `YYYY-MM-DD-slug.md` in `src/blog/`
- Required frontmatter: `title`, `date`, `tags: post`, `excerpt`, `authorName`
- Optional: `hero` (image URL), `description`
- Example from [2020-08-02-how-to-run-a-password-manager.md](src/blog/2020-08-02-how-to-run-a-password-manager.md):
  ```yaml
  ---
  title: Running Your Own Password Manager
  date: '2020-08-02T00:00:00'
  tags: post
  excerpt: By this point in time, I would hope...
  hero: /images/chris-panas-0Yiy0XajJHQ-unsplash.jpg
  ---
  ```

**Layout Hierarchy:**
- `blog.json` applies `post-layout.liquid` to all blog posts via directory data
- `post-layout.liquid` wraps content in article with hero image support
- Base `layout.liquid` provides header, footer, and "About the Author" section

## Configuration Details

**Eleventy Setup ([eleventy.config.js](eleventy.config.js)):**
- Input directory: `./src`
- Custom filter: `postDate` - formats dates as "Mon DD, YYYY" (e.g., "Aug 2, 2020")
- Passthrough: `./src/public` → `/` (root of output)

**Tailwind ([tailwind.config.js](tailwind.config.js)):**
- Content sources: `./src/**/*.{md,html,liquid,njk}`
- Plugin: `@tailwindcss/typography` for prose styling
- Processed files trigger rebuild in watch mode

**Collections:**
- `collections.post` - Auto-generated from files tagged `post`
- Homepage displays 10 most recent posts (reversed, sliced)

## Styling Conventions

- Uses utility-first Tailwind approach
- Prose content styled with `prose prose-lg` classes
- Color scheme: Gray-based with blue accents for links/hovers
- Responsive: Mobile-first with sm: breakpoints
- Cards use: `bg-white rounded-lg p-8 shadow-sm`

## Static Assets

Images stored in `src/public/images/` and referenced in markdown as `/images/filename.jpg`. The passthrough copy makes them available at the site root.

## Important Notes

- Blog posts must have `tags: post` to appear in collection
- Date format in frontmatter must be ISO string or JavaScript Date-compatible
- Hero images are optional but display prominently when provided
- The site includes Google Tag Manager (GTM-W3KRMPF) in layout

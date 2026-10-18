# Shree Nath Mahato Portfolio

A static, multi-page React portfolio built with Vite. The site includes Home, About, Projects, and Certifications pages. Project and credential content is maintained in `src/main.jsx`; styles are in `src/styles.css`; image assets live in `assets/`.

## Local development

Use Node.js 20.19 or newer, or 22.12 or newer.

```sh
npm ci
npm run dev
```

Create the deployable static site with `npm run build`. Vite writes the site to `dist/`. The built output includes the four page entry points and a custom 404 page.

## Add a project

1. Put the image in `assets/Projects/`.
2. Import it near the top of `src/main.jsx`.
3. Add a project object to the `projects` array with a unique repository slug, title, type, description, stack, repository, and image. Add `live` when there is a public demo.
4. The Projects page and category counts update from this array. Set `featured: true` to include a project on the Home page; leave it off other projects.

## Contact form protection

The site sends contact form submissions to a Google Apps Script web app. Install the updated handler from [`apps-script/Code.gs`](apps-script/Code.gs) and follow [`apps-script/README.md`](apps-script/README.md) to redeploy it. The frontend honeypot is already enabled; server-side validation and rate limits take effect only after the Apps Script deployment is updated.

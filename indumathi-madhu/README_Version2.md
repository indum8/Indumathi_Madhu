# indumathi-madhu — Static dark-theme site (initial)

This repository contains an initial static, dark-theme site (plain HTML/CSS/JS) with the following pages added:
- index.html (Home)
- about.html (About / avatar placeholder)
- projects.html (Projects / portfolio)
- blog.html (Blog list placeholders)
- contact.html (Contact form with mailto fallback)
- css/styles.css (dark theme styles, responsive layout)
- js/main.js (menu toggle, form validation, toast)
- assets/avatar-placeholder.svg (avatar placeholder)
- resume/README.md (instructions for adding resume.pdf)

Design notes
- Layout and spacing patterns are inspired by the HugoBlox template for visual guidance (nav spacing, card/grid layout), but this site is plain static HTML (no Hugo or build tools required).
- All links are relative so the site will work when served from GitHub Pages root.

How to install locally (quick)
1. Clone the repo and create a branch:
   - git clone https://github.com/indum8/indumathi-madhu.git
   - cd indumathi-madhu
   - git checkout -b site/add-static-website-from-template

2. Add the files above to the repository paths (css/, js/, assets/, resume/, and root HTML files).

3. Commit and push:
   - git add .
   - git commit -m "Add initial responsive dark-theme static site (Home, About, Projects, Blog, Contact)"
   - git push --set-upstream origin site/add-static-website-from-template

4. Open a Pull Request titled:
   - Add responsive dark-theme static website (initial pages)

Form handling (contact form)
- The current form uses client-side validation and a mailto fallback.
- To use Formspree:
  - Set the form action: <form action="https://formspree.io/f/{your-id}" method="POST"> and include any required hidden inputs per Formspree docs.
- To use Netlify Forms:
  - Add the attribute data-netlify="true" to the form and deploy to Netlify; follow Netlify forms docs for details.

Customizing content
- Avatar: replace `assets/avatar-placeholder.svg` with your photo (same filename) or update the <img> src in about.html.
- Projects: edit `projects.html` and replace placeholder cards with real thumbnails (place images in assets/) and links to repos or demos.
- Blog: create per-post pages later, or switch to a static site generator if you expect many posts.
- Colors & fonts: edit CSS variables in `css/styles.css` to change accent color and base typography.

Publishing with GitHub Pages
- When you're ready, enable GitHub Pages in repo Settings and serve from the `main` branch (root).
- Keep the repo private while editing; only enable Pages when you want the site public.

Branch & PR guidance
- Suggested branch name: `site/add-static-website-from-template`
- Commit message: `Add initial responsive dark-theme static site (Home, About, Projects, Blog, Contact)`
- PR title: `Add responsive dark-theme static website (initial pages)`

If you want I can:
- Prepare a ZIP or git-format patch of these files for you to apply,
- Or, once you grant push access, create the branch and open the PR directly.

Thank you — copy these files into your branch and I can help review or iterate further.
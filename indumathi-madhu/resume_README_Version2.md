# Resume (placeholder)

To make the "Download Resume" link work:

1. Upload your resume file to this path:
   - `resume/resume.pdf`

2. Keep the filename exactly `resume.pdf` so existing links continue to work:
   - `resume/resume.pdf`

3. If you prefer a different filename, update references in the HTML files:
   - All pages link to `resume/README.md` as a placeholder; you can update them to `resume/resume.pdf` once uploaded.

Notes:
- If you want to keep the repository private while editing, do so. When you're ready to publish, enable GitHub Pages from the repository settings and serve from the `main` branch (root).
- To embed the PDF directly in a page, you can add:
  <embed src="../resume/resume.pdf" type="application/pdf" width="100%" height="600px" />
  (Adjust path depending on location.)
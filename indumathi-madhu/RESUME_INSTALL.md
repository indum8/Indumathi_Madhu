Place your resume PDF inside the project's `assets/` folder so the site can link to it.

Steps (macOS):

1. Open Terminal.
2. Copy the file from your Desktop to the repo assets folder:

```bash
cp ~/Desktop/Indu_Portfolio/assets/Indumathi_Madhu_Resume.pdf /Users/indumathimadhu/Updated_Website/indumathi-madhu/assets/
```

3. Confirm the file exists:

```bash
ls -l /Users/indumathimadhu/Updated_Website/indumathi-madhu/assets/Indumathi_Madhu_Resume.pdf
```

After placing the file, open the site locally (http://localhost:8000/index_Version2.html) and click the Resume button — it should download or open the PDF.

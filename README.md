El-Goshen Development Foundation
================================

Next.js website for the El-Goshen Development Foundation.

Local development
-----------------

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

Deploy to Vercel
----------------

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the repository at https://vercel.com/new.
3. Keep the detected framework as Next.js.
4. Use `npm run build` as the build command if Vercel asks for one.
5. Deploy with no additional environment variables.

Vercel detects the Next.js configuration automatically; this project does not require a `vercel.json` file.

Deploy to Render
----------------

1. Push this repository to GitHub.
2. In Render, choose **New +** and then **Blueprint**.
3. Select the repository containing this project.
4. Render will read `render.yaml` and create the web service.

The Render service builds with `npm ci && npm run build` and starts with `npm run start`.

Manual Render setup is also possible:

- Environment: `Node`
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Node version: `20`

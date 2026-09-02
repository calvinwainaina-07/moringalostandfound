# Moringa Lost & Found API

## Run locally

From this directory, create a project-local virtual environment, install the API dependencies, and start FastAPI:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

The API is available at `http://127.0.0.1:8000` and its interactive docs are at `/docs`.

The registration endpoint currently supports both `user` and `admin` roles for the project demo. Restrict admin creation before deploying a public version.

The Vite frontend defaults to that URL. To use another API host, set `VITE_API_URL` in `frontend/.env`, for example:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

## Deploy to Vercel and Render

This repository includes `render.yaml`, which deploys the API and a managed PostgreSQL database.

1. Push the repository to GitHub and import it in Vercel. Set the project **Root Directory** to `frontend`; Vercel detects Vite and uses `npm run build`. Copy the assigned `*.vercel.app` URL.
2. In Render, select **New +** → **Blueprint**, select the repository, and set `CORS_ORIGINS` to that Vercel URL (for example `https://moringa-lost-found.vercel.app`). Deploy and copy the generated `https://<service>.onrender.com` URL.
3. In Vercel, add `VITE_API_URL` with the Render URL for the Production environment. Do not include a trailing slash, then redeploy the Vercel project.

`frontend/vercel.json` handles direct links to React Router pages such as `/items/1`.

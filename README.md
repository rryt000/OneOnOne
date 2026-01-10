# 1on1 Meetings

OneOnOne is a full-stack web app for coordinating one-on-one meetings. Users register, manage contacts, propose time slots, capture availability/preferences, and finalize a single meeting time. The app keeps everyone in sync with reminders, notifications, and a clear view of the final schedule. The live site is hosted at https://oneonone-project.netlify.app. Kindly be aware there is a 50 second spin-up time.

## What You Can Do
- Create an account, update your profile, and authenticate with JWT-backed sessions.
- Build a contact list by sending and accepting contact requests.
- Spin up calendars, invite contacts, and add candidate time slots with preferences.
- Collect availability votes from invitees, suggest optimal times, and finalize a meeting slot.
- Send reminders (in-app notifications or mailto links) to contacts who have not yet responded.

## Architecture
- **Frontend:** React (React Router, Axios, Bootstrap/Reactstrap), served from `OneOnOne/frontend`.
- **Backend:** Django 5 + Django REST Framework + SimpleJWT, served from `OneOnOne/backend`.
- **Static assets:** React production build collected into Django static files for deployment.
- **Persistence:** SQLite by default; configure `DATABASE_URL` for Postgres or another DB.

## Getting Started (Local Development)
### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and `pip`

### 1) Backend setup
```bash
cd OneOnOne/backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` (or export variables) before running the server:
```bash
export DJANGO_SECRET_KEY="dev-secret-key"      # required
export DEBUG="True"                            # enable Django debug locally
export ALLOWED_HOSTS="localhost,127.0.0.1"     # comma-separated list
# export DATABASE_URL="postgres://user:pass@localhost:5432/oneonone"  # optional, else SQLite
```

Apply migrations and start Django:
```bash
python manage.py migrate
python manage.py runserver  # defaults to http://127.0.0.1:8000
```

### 2) Frontend setup
```bash
cd OneOnOne/frontend
npm install
```

Create `OneOnOne/frontend/.env`:
```bash
REACT_APP_BACKEND_URL=http://127.0.0.1:8000
REACT_APP_FRONTEND_URL=http://127.0.0.1:3000
```

Run the development server:
```bash
npm start  # http://127.0.0.1:3000
```

### 3) Production build (optional)
```bash
cd OneOnOne/frontend
npm run build
```
Then collect static files from Django as usual (`python manage.py collectstatic`) before deploying.

## Using the App
Preferred for end users: open https://oneonone-project.netlify.app (frontend) which talks to the Render-hosted backend.

1. **Register & login:** Create an account on the live site, then sign in (tokens are stored in `localStorage`).
2. **Set up your profile:** Update username, email, password, and names from the Account page.
3. **Build contacts:** Send contact requests by username; accept/decline incoming requests.
4. **Create a calendar:** Add a calendar name/comment and invite contacts from your list.
5. **Propose times:** Add time slots with duration, description, and preference level.
6. **Gather availability:** Invitees vote on each time slot with their own preference/availability.
7. **Nudge participants:** Send notification or mailto reminders to contacts who have not submitted.
8. **Finalize:** Generate suggested slots, pick the best one, and finalize to lock in the meeting time.
9. **Review:** Owners and contacts can view the finalized details; notifications link directly to the calendar.

## Project Structure
- `OneOnOne/backend/` — Django project (`manage.py`, apps for accounts, contacts, calendars).
- `OneOnOne/frontend/` — React app (`src/pages` for dashboard, calendars, contacts, auth, landing).
- `staticfiles/` — Collected static assets for deployment.

## Notes for Contributors
- JWT auth is handled via `rest_framework_simplejwt`; the frontend reads `REACT_APP_BACKEND_URL`.
- Static assets in production are served from the React build; keep `STATICFILES_DIRS` aligned.
- When adding API endpoints, update the corresponding Axios calls and route guards in the frontend.

## Troubleshooting
- **Missing `DJANGO_SECRET_KEY`:** Set it in your environment; the server will refuse to start without it.
- **CORS/local URLs:** Ensure `REACT_APP_BACKEND_URL` matches where Django runs; `ALLOWED_HOSTS` should include that host.
- **Database issues:** If using Postgres, confirm `DATABASE_URL` is set and `psycopg2-binary` is installed.

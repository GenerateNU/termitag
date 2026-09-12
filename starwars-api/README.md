# Star Wars Intelligence API

## Mission Briefing

The Rebel Alliance has intercepted an Imperial database of known combatants across the galaxy. Your mission: build a REST API that lets Alliance analysts query this intelligence by faction and assess the threat level of each individual.

You have been given a skeleton codebase. Your job is to fill in the missing pieces and get it running inside Docker.

---

## What the API must do

Return a list of characters for a given faction. Each character in the response must include a computed `threat_score`.

**Threat score rule:**
```
force_sensitive = true  →  threat_score = power_level × 2
force_sensitive = false →  threat_score = power_level × 1
```

**Example response:**
```json
[
  {
    "id": 1,
    "name": "Luke Skywalker",
    "species": "Human",
    "faction": "rebel",
    "force_sensitive": true,
    "power_level": 85,
    "threat_score": 170
  }
]
```

---

## Your TODOs

### Backend
| # | File | What to implement |
|---|------|-------------------|
| 1 | `db/db.go` | Write the SQL SELECT query to fetch characters by faction |
| 2 | `handlers/characters.go` | Extract the `faction` query parameter from the request |
| 3 | `handlers/characters.go` | Validate the faction — return 400 if invalid or missing |
| 4 | `handlers/characters.go` | Compute `threat_score` for each character |
| 5 | `main.go` | Design and register your endpoint path |

### Frontend
| # | File | What to implement |
|---|------|-------------------|
| 6 | `frontend/src/App.jsx` | Fetch characters from the backend with the selected faction |
| 7 | `frontend/src/App.jsx` | Render a styled card for each character |

Search for `// TODO` in the codebase to find every location.

---

## Valid factions

`rebel` · `empire` · `jedi` · `sith` · `neutral`

---

## Getting started

### 1. Build and run with Docker

```sh
docker build -t starwars-api .
docker run -p 8080:8080 starwars-api
```

> Tip: rebuild after every code change — `docker build -t starwars-api . && docker run -p 8080:8080 starwars-api`

### 2. Test your API

```sh
python3 test/test_api.py
```

> **Before running tests:** update the `ENDPOINT` variable at the top of `test/test_api.py`
> to match the path you registered in `main.go`.

---

### 3. Run the frontend

```sh
cd frontend
npm install
npm run dev   # starts on http://localhost:5173
```

The backend must be running on `:8080` for the fetch to work.
The Vite dev server automatically proxies `/api/*` requests to `http://localhost:8080`.

---

## Project structure

```
starwars-api/
├── Dockerfile
├── main.go              ← HTTP server entry point
├── db/
│   └── db.go            ← Database setup and queries
├── handlers/
│   └── characters.go    ← HTTP request handler
├── models/
│   └── character.go     ← Data types (read-only)
├── test/
│   └── test_api.py      ← Python test script
└── frontend/
    ├── src/
    │   └── App.jsx      ← React component (your TODOs are here)
    └── vite.config.js   ← Vite config with API proxy
```

# Bootcamp Activity — Star Wars Intelligence API

## Before you start

Complete this section **before the session**. It's all downloads — do it ahead of time.

### 1. Install mise

mise manages your Go and Node versions so everyone runs the same toolchain.

**Mac**
```sh
curl https://mise.run | sh
```
Then follow the shell setup instructions it prints. [Full guide](https://mise.jdx.dev/getting-started.html)

**Windows**
```powershell
winget install jdx.mise
```
[Full guide](https://mise.jdx.dev/getting-started.html)

### 2. Install Docker Desktop

- [Mac](https://docs.docker.com/desktop/setup/install/mac-install/)
- [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)

After installing, open Docker Desktop and make sure it's running before the session.

### 3. Clone the repo and install dependencies

```sh
git clone <repo-url>
cd termitag
git checkout starwars-bootcamp-activity
mise install                          # installs Go and Node
cd starwars-api/frontend
npm install
```

---

## During the session

### Step 1 — Confirm Docker works (5 min)

From `starwars-api/`:
```sh
docker build -t starwars-api .
docker run -p 8080:8080 starwars-api
```

You should see:
```
Server starting on :8080...
```

Stop the container (`Ctrl+C`) and move on. You'll rebuild later once the TODOs are filled in.

---

### Step 2 — Register your endpoint (2 min)

Open `main.go`. Find the TODO and register your handler:

```go
http.HandleFunc("/your/path/here", handlers.GetCharacters)
```

Think about what HTTP method this should be and what the URL path should look like for a resource called "characters".

---

### Step 3 — Write the SQL query (10 min)

Open `db/db.go`. Find `GetCharactersByFaction` and fill in the TODO.

You need to:
1. Query the `characters` table filtering by `faction`
2. Loop over the rows and scan each one into a `models.Character`
3. Return the slice

The table columns are: `id`, `name`, `species`, `faction`, `force_sensitive` (INTEGER 0/1), `power_level`.

---

### Step 4 — Build the handler (10 min)

Open `handlers/characters.go`. There are 5 TODOs inside `GetCharacters`:

| # | What |
|---|------|
| 1 | Extract the `faction` query parameter |
| 2 | Validate it — return 400 if missing or not a valid faction |
| 3 | Call `db.GetCharactersByFaction` |
| 4 | Compute `threat_score` for each character |
| 5 | Write a JSON response |

**Threat score rule:**
```
force_sensitive = true  →  threat_score = power_level × 2
force_sensitive = false →  threat_score = power_level × 1
```

---

### Step 5 — Test the backend (3 min)

Rebuild and run:
```sh
docker build -t starwars-api . && docker run -p 8080:8080 starwars-api
```

In a second terminal, from `starwars-api/`:
```sh
python3 test/test_api.py
```

You should see `5/5 tests passed`. If not, read the output — it tells you which case failed.

> Update the `ENDPOINT` variable at the top of `test_api.py` to match the path you registered.

---

### Step 6 — Build the frontend fetch (10 min)

With the backend still running, open a new terminal and from `starwars-api/frontend/`:
```sh
npm run dev
```

Open `http://localhost:5173`. You'll see the UI but the button does nothing yet.

Open `src/App.tsx` and fill in **TODO 1** inside `handleFetch`:
1. Call `fetch('/api/characters?faction=' + faction)`
2. If the response is not ok, throw an Error
3. Parse the body with `.json()` and call `setCharacters(data)`

The Vite dev server proxies `/api/*` to `http://localhost:8080` automatically — no need to hardcode the backend URL.

---

### Step 7 — Render the character cards (10 min)

Fill in **TODO 2** in `src/App.tsx`.

Each character has: `id`, `name`, `species`, `faction`, `force_sensitive`, `power_level`, `threat_score`.

Ideas for the card:
- Bold name as the heading
- `threat_score` as a colored badge — red if > 150, yellow if 75–150, green if < 75
- Conditionally show a "Force Sensitive" tag when `force_sensitive` is true

---

### Done

Select a faction, click **Scan Faction**, and you should see character cards with threat scores.

Try selecting `sith` — no characters are seeded for that faction. What does your UI show? What *should* it show?

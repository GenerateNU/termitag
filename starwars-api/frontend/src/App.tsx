import { useState, type ChangeEvent } from "react";

const FACTIONS = ["rebel", "empire", "jedi", "sith", "neutral"];

// Tip for TODO 2: use threat_score to pick a badge color
//   threat_score > 150  → high threat   → red
//   threat_score 75–150 → medium threat → yellow
//   threat_score < 75   → low threat    → green

interface Character {
  id: number;
  name: string;
  species: string;
  faction: string;
  force_sensitive: boolean;
  power_level: number;
  threat_score: number;
}

// threatBadge maps a threat_score to Tailwind classes for its severity color.
function threatBadge(score: number): string {
  if (score > 150) return "bg-red-500/20 text-red-300";

  if (score >= 75) return "bg-yellow-500/20 text-yellow-300";

  return "bg-green-500/20 text-green-300";
}

export default function App() {
  const [faction, setFaction] = useState("rebel");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFetch() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/characters?faction=${faction}`);

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const data = await res.json();
      setCharacters(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2 tracking-wide">
        Rebel Alliance Intelligence Database
      </h1>
      <p className="text-gray-400 mb-8 text-sm">Select a faction and scan for known operatives.</p>

      {/* Controls */}
      <div className="flex gap-3 mb-8 items-center">
        <select
          value={faction}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setFaction(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {FACTIONS.map((f) => (
            <option key={f} value={f}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-yellow-400 text-gray-950 font-semibold px-4 py-2 rounded hover:bg-yellow-300 disabled:opacity-50 transition-colors"
        >
          {loading ? "Scanning..." : "Scan Faction"}
        </button>
      </div>

      {/* Error state */}
      {error && <p className="text-red-400 mb-6 text-sm">Intel error: {error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {characters.map((c) => (
          <div key={c.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold truncate">{c.name}</p>
                <p className="text-gray-400 text-sm capitalize">
                  {c.species} · {c.faction}
                </p>
              </div>
              <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${threatBadge(c.threat_score)}`}>
                {c.threat_score}
              </span>
            </div>

            {c.force_sensitive && (
              <span className="inline-block mt-3 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                Force Sensitive
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

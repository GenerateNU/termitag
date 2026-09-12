import { useState, type ChangeEvent } from "react";

const FACTIONS = ["rebel", "empire", "jedi", "sith", "neutral"];


interface Character {
  id: number;
  name: string;
  species: string;
  faction: string;
  force_sensitive: boolean;
  power_level: number;
  threat_score: number;
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
        const body = await res.json();
        throw new Error(body.error ?? `request failed with status ${res.status}`);
      }
      const data: Character[] = await res.json();
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
        {characters.map((c) => {
          const badgeColor =
            c.threat_score > 150
              ? "bg-red-500"
              : c.threat_score >= 75
                ? "bg-yellow-400 text-gray-950"
                : "bg-green-500";

          return (
            <div key={c.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-white">{c.name}</p>
                {c.force_sensitive && (
                  <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full shrink-0">
                    Force Sensitive
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                {c.species} · {c.faction}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-500 text-xs">Power: {c.power_level}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
                  Threat {c.threat_score}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/bootcamp/starwars-api/db"
	"github.com/bootcamp/starwars-api/models"
)

// validFactions is the set of faction values the API accepts.
var validFactions = map[string]bool{
	"rebel":   true,
	"empire":  true,
	"jedi":    true,
	"sith":    true,
	"neutral": true,
}

// GetCharacters handles requests for Star Wars characters filtered by faction.
// It returns each character alongside a computed threat_score.
func GetCharacters(w http.ResponseWriter, r *http.Request) {
	// TODO 1: Extract the "faction" query parameter from the request URL.
	//         Hint: r.URL.Query().Get("faction")
	faction := r.URL.Query().Get("faction")

	// TODO 2: Validate the faction value.
	//         If faction is empty or not present in validFactions,
	//         write an HTTP 400 response with JSON: {"error": "invalid or missing faction"}
	//         then return early.
	if !validFactions[faction] {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusBadRequest)
    json.NewEncoder(w).Encode(map[string]string{"error": "invalid or missing faction"})
    return
	}

	// TODO 3: Call db.GetCharactersByFaction(faction) to fetch matching characters.
	//         If the call returns an error, write an HTTP 500 response and return.
	characters, err := db.GetCharactersByFaction(faction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// TODO 4: Compute threat_score for each character and build the response slice.
	//         Rule:
	//           force_sensitive = true  → threat_score = power_level * 2
	//           force_sensitive = false → threat_score = power_level * 1
	results := []models.CharacterResponse{}
	for _, c := range characters {
		score := c.PowerLevel
		if c.ForceSensitive {
			score = c.PowerLevel * 2
		}
		results = append(results, models.CharacterResponse{Character: c, ThreatScore: score})
	}

	// TODO 5: Write a JSON response.
	//         Set the Content-Type header to "application/json", then encode results.
	//         Hint: json.NewEncoder(w).Encode(results)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

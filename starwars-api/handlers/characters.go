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
	faction := r.URL.Query().Get("faction")

	if !validFactions[faction] {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid or missing faction"})
		return
	}

	characters, err := db.GetCharactersByFaction(faction)
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	results := make([]models.CharacterResponse, len(characters))
	for i, c := range characters {
		threatScore := c.PowerLevel
		if c.ForceSensitive {
			threatScore *= 2
		}
		results[i] = models.CharacterResponse{Character: c, ThreatScore: threatScore}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

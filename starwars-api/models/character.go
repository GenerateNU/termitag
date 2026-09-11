package models

// Character represents a row from the characters table.
type Character struct {
	ID             int    `json:"id"`
	Name           string `json:"name"`
	Species        string `json:"species"`
	Faction        string `json:"faction"`
	ForceSensitive bool   `json:"force_sensitive"`
	PowerLevel     int    `json:"power_level"`
}

// CharacterResponse is what the API returns — a Character plus a computed ThreatScore.
type CharacterResponse struct {
	Character
	ThreatScore int `json:"threat_score"`
}

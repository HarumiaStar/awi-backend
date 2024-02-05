# get games by zone
[Retour](./GameZone.md)

**Description :**
Récupère tous les jeux d'une zone

**Route :** `GET /api/game-zones/games/:id`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des jeux de la zone : 
```json
[
    "41892825-3726-464c-a5e6-12451102d89b",
    "41892825-3726-464c-a5e6-12451102d89b",
    ...
]
```
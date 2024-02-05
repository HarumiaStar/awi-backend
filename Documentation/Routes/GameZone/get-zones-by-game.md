# get zones by game
[Retour](./GameZone.md)

**Description :**
Récupère toutes les zones d'un jeu

**Route :** `GET /api/game-zones/zones/:id`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des zones du jeu : 
```json
[
    "41892825-3726-464c-a5e6-12451102d89b",
    "41892825-3726-464c-a5e6-12451102d89b",
    ...
]
```

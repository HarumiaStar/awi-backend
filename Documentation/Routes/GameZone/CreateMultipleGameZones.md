# Create multiple game-zones
[Retour](./GameZone.md)

**Description :**
Crée plusieurs associations jeu-zone

**Route :** `POST /api/game-zones/multiple`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `gameZones` : tableau d'associations jeu-zone

ex :
```json
{
    "gameZones": [
        {
            "gameId": "41892825-3726-464c-a5e6-12451102d89b",
            "zoneId": "41892825-3726-464c-a5e6-12451102d89b",
        },
        {
            "gameId": "41892825-3726-464c-a5e6-12451102d89b",
            "zoneId": "41892825-3726-464c-a5e6-12451102d89b",
        }
    ]
}
```

**Réponse :**
Soit :
- `200` : si les associations ont été crées (retourne les associations crées avec leur id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
- `404 Not Found` : si le jeu ou la zone n'existe pas

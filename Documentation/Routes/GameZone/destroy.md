# destroy
[Retour](./GameZone.md)

**Description :**
Supprime une association jeu-zone

**Route :** `DELETE /api/game-zones/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `gameId` : l'id du jeu
- `zoneId` : l'id de la zone

ex :
```json
{
    "gameId": "41892825-3726-464c-a5e6-12451102d89b",
    "zoneId": "41892825-3726-464c-a5e6-12451102d89b",
}
```

**Réponse :**
Soit :
- `200` : si l'association a été supprimée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
- `404 Not Found` : si le jeu ou la zone n'existe pas

# store
[Retour](./Zones.md)

**Description :**
Crée une zone

**Route :** `POST /api/zones/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `name` : le nom de la zone 
- `description` : la description de la zone
- `maxCapacity` : la capacité maximum de la zone
- `animation` : si la zone est animée ou non
- `festivalId` : l'id du festival auquel appartient la zone

ex :
```json
{
    "name" : "TestZone",
    "description": "TestDescription",
    "maxCapacity": 100,
    "animation": true,
    "festivalId": "41892825-3726-464c-a5e6-12451102d89b"
}
```

**Réponse :**
Soit :
- `200` : si la zone a été crée (retourne la zone crée avec son id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
- `404 Not Found` : si le festival n'existe pas

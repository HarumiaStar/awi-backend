# update
[Retour](./Zones.md)

**Description :**
Mise à jour d'une zone

**Route :** `PUT /api/zones/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `name` : le nom de la zone (optionnel)
- `description` : la description de la zone (optionnel)
- `maxCapacity` : la capacité maximum de la zone (optionnel)
- `animation` : si la zone est animée ou non (optionnel)
- `festivalId` : l'id du festival auquel appartient la zone (optionnel)

ex :
```json
{
    "description": "TestDescription",
    "maxCapacity": 100,
}
```

**Réponse :**
Soit :
- `200` : si la zone a été mise à jour (retourne la zone mise à jour)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

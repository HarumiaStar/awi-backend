# update
[Retour](./Slots.md)

**Description :**
Mise à jour d'un créneau

**Route :** `PUT /api/slots/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `startTime` : l'heure de début du créneau (optionnel)
- `endTime` : l'heure de fin du créneau (optionnel)

ex :
```json
{
    "startTime": "27/01/2024 10:00",
}
```

**Réponse :**
Soit :
- `200` : si le créneau a été mis à jour (retourne le créneau mis à jour)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

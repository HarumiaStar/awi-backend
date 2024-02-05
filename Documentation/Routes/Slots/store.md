# store
[Retour](./Slots.md)

**Description :**
Crée un créneau

**Route :** `POST /api/slots/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `startTime` : l'heure de début du créneau
- `endTime` : l'heure de fin du créneau

ex :
```json
{
    "startTime": "27/01/2024 10:00",
    "endTime": "27/01/2024 12:00"
}
```

**Réponse :**
Soit :
- `200` : si le créneau a été crée (retourne le créneau crée avec son id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

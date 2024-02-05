# Create multiple slots
[Retour](./Slots.md)

**Description :**
Crée plusieurs créneaux

**Route :** `POST /api/slots/multiple`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `slots` : tableau de créneaux

ex :
```json
{
    "slots": [
        {
            "startTime": "27/01/2024 10:00",
            "endTime": "27/01/2024 12:00"
        },
        {
            "startTime": "27/01/2024 14:00",
            "endTime": "27/01/2024 16:00"
        }
    ]
}   
```

**Réponse :**
Soit :
- `200` : si les créneaux ont été crées (retourne les créneaux crées avec leur id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
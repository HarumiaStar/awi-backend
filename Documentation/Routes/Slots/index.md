# index
[Retour](./Slots.md)

**Description :**
Récupère tous les créneaux

**Route :** `GET /api/slots`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des créneaux : 
```json
[
    {   
        "id": "41892825-3726-464c-a5e6-12451102d89b",
        "startTime": "27/01/2024 10:00",
        "endTime": "27/01/2024 12:00",
        "created_at": "2024-01-27T18:51:00.874+01:00",
        "updated_at": "2024-01-27T18:51:00.875+01:00"
    },
    {
        ...
    }
]
```

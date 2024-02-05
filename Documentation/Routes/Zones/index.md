# index
[Retour](./Zones.md)

**Description :**
Récupère toutes les zones

**Route :** `GET /api/zones`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des zones : 
```json
[
  {
      "id": "41892825-3726-464c-a5e6-12451102d89b",
      "name" : "TestZone",
      "description": "TestDescription",
      "maxCapacity": 100,
      "animation": true,
      "festivalId": "41892825-3726-464c-a5e6-12451102d89b",
      "created_at": "2024-01-27T18:51:00.874+01:00",
      "updated_at": "2024-01-27T18:51:00.875+01:00"
  },
  {
  ...
  }
]
```

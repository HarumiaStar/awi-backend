# index
[Retour](./Volunteers.md)

**Description :**
Récupère tous les bénévoles

**Route :** `GET /api/slots`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des bénévoles : 
```json
[
    {
        "id": "41892825-3726-464c-a5e6-12451102d89b",
        "firstname": "John",
        "lastname": "Doe",
        "email": "jhondoe@gmail.com",
        "address": "1 rue de la paix",
        "phone": "0123456789",
        "username": "jdoe",
        "avatarUrl": "lien",
        "nbEditionPerformed": 2,
        "tshirtSize": "M",
        "lodging": "proposition",
        "foodRegime": "vegetarien",
        "isAdmin": false,
        "associations": [{
            "id": "dc088f27-699c-480b-9c24-a09464cba92e",
            "name": "PolyEarth",
            "mail": "aaaa@gmail.com",
            "created_at": "2024-02-03T17:09:15.532+01:00",
            "updated_at": "2024-02-03T17:09:15.532+01:00"
        }]
    },
    {
        ...
    }
]
```

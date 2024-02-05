# get Self
[Retour](./Volunteers.md)

**Description :**
Récupère les informations de l'utilisateur connecté

**Route :** `GET /api/volunteers/me`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
```json
{
    "id": "11111-AAAAA",
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
}
```

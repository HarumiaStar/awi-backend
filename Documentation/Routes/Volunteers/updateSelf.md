# update Self
[Retour](./Volunteers.md)

**Description :**
Met à jour les informations de l'utilisateur connecté

**Route :** `PUT /api/volunteers/me`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- Partial de : 
```json
{
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
    "associations": ["dc088f27-699c-480b-9c24-a09464cba92e"]
}
```
*Si on veut enlever une association à l'utilisateur, on a juste à la retirer de la liste des associations.*

**Réponse :**
Soit :
- `200` : si l'utilisateur a été mis à jour
- `400` : si la requête est mal formée

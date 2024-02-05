# Store
[Retour](./Volunteers.md)

**Description :**
Crée un bénévole

**Route :** `POST /api/volunteers`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `volunteer` : 
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "jhondoe@gmail.com",
    "address": "1 rue de la paix",
    "phone": "0123456789",
    "username": "jdoe",
    "password": "password",
    "avatarUrl": "lien",
    "nbEditionPerformed": 2,
    "tshirtSize": "M",
    "lodging": "proposition",
    "foodRegime": "vegetarien",
    "associations": ["dc088f27-699c-480b-9c24-a09464cba92e"]
}
```

**Réponse :**
Soit :
- `200` : si le bénévole a été crée (retourne le bénévole crée avec son id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
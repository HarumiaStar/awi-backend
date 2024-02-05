# show
[Retour](./Association.md)

**Description :**
Crée une association

**Route :** `GET api/associations/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `name` : le titre de l'association
- `mail` : le mail de l'association
- `volunteers` : la liste complète des identifiants (uuid) des bénévoles dans cette associations

**Réponse :**
Soit :
- `200` : si l'association a été crée
```js
{
  "id": "533f8a6d-1aca-4188-920f-25c09f3dac39",
  "name": "PolyEarth3",
  "mail": "aaaaaa@gmail.com",
  "volunteers": [
    {
      "id": "1fe819a1-588c-419f-ad28-0975b2f328b0",
      "firstname": "ccc",
      "lastname": "ccc",
      "email": "cccccc@gmail.com",
      "tshirt_size": "L",
      "nb_edition_performed": "2",
      "lodging": "aucun",
      "address": "123c av ici",
      "phone": "0600000000",
      "username": "TOTODU39",
      "avatar_url": "https:&#x2F;&#x2F;st2.depositphotos.com&#x2F;2703645&#x2F;7304&#x2F;v&#x2F;450&#x2F;depositphotos_73040253-stock-illustration-male-avatar-icon.jpg",
      "food_regime": "vegetarien",
      "is_admin": true,
      "is_present": false,
      "remember_me_token": null,
      "created_at": "2024-01-31T10:36:09.290+01:00",
      "updated_at": "2024-02-03T19:10:33.034+01:00"
    }
  ],
  "created_at": "2024-02-03T17:10:37.340+01:00",
  "updated_at": "2024-02-03T17:10:37.340+01:00"
}
```
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

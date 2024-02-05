# Update
[Retour](./Volunteers.md)

**Description :**
Met à jour un volontaire

**Route :** `PUT /api/volunteers/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `firstName` : le prénom du volontaire (optionnel)
- `lastName` : le nom du volontaire (optionnel)
- `email` : l'email du volontaire (optionnel)
- `phone` : le téléphone du volontaire (optionnel)
- `address` : l'adresse du volontaire (optionnel)
- `avatarUrl` : l'url de l'avatar du volontaire (optionnel)
- `nbEditionPerformed` : le nombre d'éditions effectuées par le volontaire (optionnel)
- `tshirtSize` : la taille du t-shirt du volontaire (optionnel)
- `lodging` : le logement du volontaire (optionnel)
- `foodRegime` : le régime alimentaire du volontaire (optionnel)
- `associations` : les associations du volontaire (optionnel)

ex :
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "jhondoe@gmail.com",
    "avatarUrl": "lien",
}
```

**Réponse :**
Soit :
- `200` : si le volontaire a été mis à jour (retourne le volontaire mis à jour)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : le volontaire n'existe pas
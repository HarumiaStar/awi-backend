# update
[Retour](./Festivals.md)

**Description :**
Mise à jour d'un festival

**Route :** `PUT /api/festivals/:id`

**Body :** 
- `Authorization` : token d'authentification de l'utilisateur 
- `title` : le titre du festival (optionnel)
- `start_date` : la date du début du festival (optionnel)
- `end_date` : la date de fin du festival (optionnel)
- `address` : l'adresse du festival (optionnel)
- `description` : la description du festival (optionnel)
- `poster_path` : le lien de l'affiche du festival (optionnel)

ex : 
```json
{
  "title": "Festival du jeu 2024",
}
```

**Réponse :**
Soit :
- `200` : si le festival a été mis à jour
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

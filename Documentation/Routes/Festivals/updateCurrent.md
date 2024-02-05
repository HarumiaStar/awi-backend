# updateCurrent
[Retour](./Festivals.md)

**Description :**
Mise à jour du festival en cours / celui qui arrive

**Route :** `PUT /api/festivals/current`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `title` : le titre du festival
- `start_date` : la date du début du festival
- `end_date` : la date de fin du festival
- `address` : l'adresse du festival
- `description` : la description du festival
- `poster_path` : le lien de l'affiche du festival

**Réponse :**
Soit :
- `200` : si le festival courrant a été mis à jour
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

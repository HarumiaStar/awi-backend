# update
[Retour](./Association.md)

**Description :**
Met à jour une association

**Route :** `PUT api/associations/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `name` : le titre de l'association
- `mail` : le mail de l'association
- `volunteers` : la liste complète des identifiants (uuid) des bénévoles dans cette associations

**Réponse :**
Soit :
- `200` : si l'association a été crée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

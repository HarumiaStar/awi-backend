# storeAll
[Retour](../Assignments.md)

**Description :**
Créer une affectation pour tous les bénévoles non flexible.

**Route :** `POST api/assignments/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
Soit : 
- `200` : si l'affectation a été crée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

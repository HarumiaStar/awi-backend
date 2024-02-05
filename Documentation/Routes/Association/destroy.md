# destroy
[Retour](./Association.md)

**Description :**
Supprime une association

**Route :** `DELETE api/associations/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :** 
Soit : 
- `200` : si l'association a été supprimé
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
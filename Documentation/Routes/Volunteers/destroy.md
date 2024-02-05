# Destroy
[Retour](./Volunteers.md)

**Description :**
Supprime un volontaire

**Route :** `DELETE /api/volunteers/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
  
**Réponse :**
Soit :
- `200` : si le volontaire a été supprimé
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : le volontaire n'existe pas
  
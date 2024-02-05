# destroy
[Retour](./Zones.md)

**Description :**
Supprime une zone

**Route :** `DELETE /api/zones/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**

**Réponse :**
Soit :
- `200` : si la zone a été supprimée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : la donnée demandée n'existe pas

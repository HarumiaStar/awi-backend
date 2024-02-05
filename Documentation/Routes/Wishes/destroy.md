# destroy
[Retour](./Wishes.md)

**Description :**
Supprime un souhait, uniquement lui-même (sauf s'il est admin)

**Route :** `DELETE /api/wishes/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
Soit :
- `200` : si le souhait a été supprimé
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas

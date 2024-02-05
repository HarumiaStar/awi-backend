# Show 
[Retour](./Volunteers.md)

**Description :**
Récupère un volontaire

**Route :** `GET /api/volunteers/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**

**Réponse :**
Soit :
- `200` : si le volontaire existe (avec le volontaire)
- `404` : si le volontaire n'existe pas
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
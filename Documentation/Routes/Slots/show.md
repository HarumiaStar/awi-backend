# show
[Retour](./Slots.md)

**Description :**
Récupère un créneau en fonction de son id

**Route :** `GET /api/slots/:id`

**Body :**
Rien

**Réponse :**
Soit :
- `200` : si le créneau existe (avec le créneau)
- `404` : si le créneau n'existe pas
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

# update
[Retour](./Wishes.md)

**Description :**
Mise à jour d'un souhait, uniquement lui-même (sauf s'il est admin)

**Route :** `PUT /api/wishes/:id`

**Body :** 
- `Authorization` : token d'authentification de l'utilisateur 
- `volunteer_id` : l'identifiant (uuid) du bénévole
- `zone_id` : l'identifiant (uuid) de la zone
- `slot_id` : l'identifiant (uuid) du crénau horraire
- `is_referent` : vrai ou faux si le bénévole souhaite être référent

**Réponse :**
Soit :
- `200` : si le souhait a été mis à jour
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

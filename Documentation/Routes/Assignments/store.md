# store
[Retour](Assignments.md)

**Description :**
Créer une affectation pour un bénévole.

**Route :** `POST api/assignments/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `volunteer_id` : l'identifiant (uuid) du bénévole
- `zone_id` : l'identifiant (uuid) de la zone
- `slot_id` : l'identifiant (uuid) du crénau horraire
- `is_referent` : vrai ou faux si le bénévole souhaite être référent

**Réponse :**
Soit : 
- `200` : si l'affectation a été crée
```js
{
    "id": "b9c1f2aa-7997-4867-b7b6-e9a0a24ce0c5"
    "zone_id": "f6412225-f047-470c-85d3-114f08f16549",
    "volunteer_id": "1fe819a1-588c-419f-ad28-0975b2f328b0",
    "slot_id":"5cabca63-3a7e-497b-814a-0a97eaf109fe",
    "is_referent": false,
    "created_at": "2024-02-03T17:10:37.340+01:00",
    "updated_at": "2024-02-03T17:10:37.340+01:00"
}
```
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

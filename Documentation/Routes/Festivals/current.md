# showCurrent
[Retour](./Festivals.md)

**Description :**
Récupère le festival en cours / celui qui arrive

**Route :** `GET /api/festivals/current`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
Soit :
- `200` : si le festival existe
```json
{
  "id": "305440a7-6516-48a6-8582-6074e9e499bd",
  "start_date": "2024-01-27T00:00:00.000+01:00",
  "end_date": "2024-01-28T00:00:00.000+01:00",
  "address": "Esplanade Charles de Gaules",
  "description": "Ce merveilleux festival revient avec pleins de nouveautés",
  "posterPath": "https:&#x2F;&#x2F;www.festivaldujeu-montpellier.org&#x2F;wp-content&#x2F;uploads&#x2F;2023&#x2F;02&#x2F;Affiche-2023-1417x1006-1.jpg",
  "created_at": "2024-01-27T18:51:00.874+01:00",
  "updated_at": "2024-01-27T18:51:00.875+01:00"
}
```
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

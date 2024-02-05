# store
[Retour](../Festivals.md)

**Description :**
Crée un festival

**Route :** `POST /api/festivals/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `title` : le titre du festival
- `start_date` : la date du début du festival
- `end_date` : la date de fin du festival
- `address` : l'adresse du festival
- `description` : la description du festival
- `poster_path` : le lien de l'affiche du festival (optionnel)

ex : 
```json
{
  "title": "Festival du jeu 2024",
  "start_date": "dd/MM/yyyy",
  "end_date": "dd/MM/yyyy",
  "address": "Esplanade Charles de Gaules",
  "description": "Ce merveilleux festival revient avec pleins de nouveautés",
  "poster_path": "https://www.festivaldujeu-montpellier.org/wp-content/uploads/2023/02/Affiche-2023-1417x1006-1.jpg"
}
```

**Réponse :**
Soit :
- `200` : si le festival a été crée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

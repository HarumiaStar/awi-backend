# index
[Retour](./Games.md)

**Description :**
Récupère tous les jeux

**Route :** `GET /api/games`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des jeux : 
```json
[
  {
      "id": "41892825-3726-464c-a5e6-12451102d89b",
      "name": "TestName",
      "author": "TestAuthor",
      "editor": "TestEditor",
      "maxPlayers": 10,
      "minPlayers": 2,
      "minAge": 10,
      "duration": 60,
      "toAnimate": true,
      "recieved": true,
      "type": "TestType",
      "mechanics": "TestMechanics",
      "theme": "TestTheme",
      "tags": "TestTags",
      "description": "TestDescription",
      "image": "TestImage",
      "logo": "TestLogo",
      "video": "TestVideo",
      "manual": "TestManual"
  },
  {
  ...
  }
]
```
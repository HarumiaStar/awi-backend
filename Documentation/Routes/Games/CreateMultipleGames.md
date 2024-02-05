# Create multiple games
[Retour](./Games.md)

**Description :**
Crée plusieurs jeux

**Route :** `POST /api/games/multiple`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `games` : tableau de jeux

ex :
```json
{
    "games": [
        {
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
            "name": "TestName2",
            "author": "TestAuthor2",
            "editor": "TestEditor2",
            "maxPlayers": 10,
            "minPlayers": 2,
            "minAge": 10,
            "duration": 60,
            "toAnimate": true,
            "recieved": true,
            "type": "TestType2",
            "mechanics": "TestMechanics2",
            "theme": "TestTheme2",
            "tags": "TestTags2",
            "description": "TestDescription2",
            "image": "TestImage2",
            "logo": "TestLogo2",
            "video": "TestVideo2",
            "manual": "TestManual2"
        }
    ]
}
```

**Réponse :**
Soit :
- `200` : si les jeux ont été crées (retourne les jeux crées avec leur id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

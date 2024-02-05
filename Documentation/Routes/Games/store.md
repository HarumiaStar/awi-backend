# store
[Retour](./Games.md)

**Description :**
Crée un jeu

**Route :** `POST /api/games/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `name` : le nom du jeu
- `author` : l'auteur du jeu
- `editor` : l'éditeur du jeu
- `maxPlayers` : le nombre de joueurs maximum
- `minPlayers` : le nombre de joueurs minimum
- `minAge` : l'âge minimum pour jouer
- `duration` : la durée d'une partie
- `toAnimate` : si le jeu est animé ou non
- `recieved` : si le jeu est reçu ou non
- `type` : le type du jeu
- `mechanics` : la mécanique du jeu
- `theme` : le thème du jeu
- `tags` : les tags du jeu
- `description` : la description du jeu
- `image` : l'image du jeu
- `logo` : le logo du jeu
- `video` : la vidéo du jeu
- `manual` : le manuel du jeu

ex :
```json
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
}
```

**Réponse :**
Soit :
- `200` : si le jeu a été crée (retourne le jeu crée avec son id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

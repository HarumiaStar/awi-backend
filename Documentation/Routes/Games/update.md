# update
[Retour](./Games.md)

**Description :**
Mise à jour d'un jeu

**Route :** `PUT /api/games/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `name` : le nom du jeu (optionnel)
- `author` : l'auteur du jeu (optionnel)
- `editor` : l'éditeur du jeu (optionnel)
- `maxPlayers` : le nombre de joueurs maximum (optionnel)
- `minPlayers` : le nombre de joueurs minimum (optionnel)
- `minAge` : l'âge minimum pour jouer (optionnel)
- `duration` : la durée d'une partie (optionnel)
- `toAnimate` : si le jeu est animé ou non (optionnel)
- `recieved` : si le jeu est reçu ou non (optionnel)
- `type` : le type du jeu (optionnel)
- `mechanics` : la mécanique du jeu (optionnel)
- `theme` : le thème du jeu (optionnel)
- `tags` : les tags du jeu (optionnel)
- `description` : la description du jeu (optionnel)
- `image` : l'image du jeu (optionnel)
- `logo` : le logo du jeu (optionnel)
- `video` : la vidéo du jeu (optionnel)
- `manual` : le manuel du jeu (optionnel)

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
- `200` : si le jeu a été mis à jour (retourne le jeu mis à jour)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

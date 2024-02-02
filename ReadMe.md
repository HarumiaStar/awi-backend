# Backend du projet AWI sur la création d'un système de gestion de bénévoles pour des événements

## Installation du projet

### Prérequis

- NodeJS
- NPM


### Installation 

```bash
npm install
npm run initDB
```

## Usage

```bash
npm start
```

## Installation de la base de données

### Prérequis

- Docker
- Docker-compose

### Installation

```bash
docker-compose up
```

## Tests

## Lancement des tests

**Attention :** ne pas lancer les tests sur la base de données de production.

```bash
npm run initDB
npm run test
```

## Modification des tests

Les tests sont situés dans le dossier `test/`. De ce que je comprend, les tests peuvent être rangé dans des dossiers et sous-dossiers (dans `test/`), mais il faut que le nom du fichier se termine par `.spec.ts` pour que les tests soient pris en compte.

[documentation](https://japa.dev/docs/reference/test)

Quelques spécificités de la syntaxe des tests :
- On peut grouper les tests avec `test.group('nom', fonction)`.
- On peut définir des fonctions qui seront exécutées avant chaque test avec `test.each.setup()`, ce qui est dans setup permet de mettre en place la base de données.
- On peut définir des fonctions qui seront exécutés après chaque test avec `test.each.teardown()`, ce qui est dans teardown permet de nettoyer la base de données.


### Technologies utilisées


- NodeJS
- Typescript
- AdonisJS

# Routes

## Authentification


### Register

**Route :** `POST /api/auth/register`

**Body :**
- `firstname` : prénom de l'utilisateur
- `lastname` : nom de l'utilisateur
- `username` : nom d'utilisateur de l'utilisateur (optionnel)
- `email` : email de l'utilisateur
- `tshirt_size` : taille du t-shirt de l'utilisateur (XS, S, M, L, XL, XXL, XXXL)
- `nb_edition_performed` : nombre d'éditions auxquelles l'utilisateur a participé
- `lodging` : type de logement de l'utilisateur (proposition, recherche, aucun)
- `address` : adresse de l'utilisateur (peut être vide)
- `phone` : numéro de téléphone de l'utilisateur (peut être vide)
- `avatar_url` : url de l'avatar de l'utilisateur (peut être vide)
- `food_regime` : régime alimentaire de l'utilisateur (vegetarien, carnivore, autre)
- `password` : mot de passe de l'utilisateur

**Réponse :**
Soit :
- `201` : si l'utilisateur a été créé
- `400` : si la requête est mal formée

### Login

**Route :** `POST /api/auth/login`

**Body :**
- `email` : email de l'utilisateur
- `password` : mot de passe de l'utilisateur

**Réponse :**
- `401` : si l'authentification a échoué

- `200` : avec le token : 
```json
{
    "type": "bearer",
    "token": "token",
    "expires_at": "2024-01-25T15:59:03.136+01:00"
}
```

### Logout

**Route :** `POST /api/auth/logout`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
```json
{ 
    "revoked": true 
}
```

### get hash seed

**Description :** 
Récupère le hash seed afin que l'utilisateur puisse hasher son mot de passe en local

**Route :** `GET /api/auth/hash-seed`

**Réponse :**
```json
{
    "hashSeed": "seed"
}
```

## Volunteers

### get Self

**Description :**
Récupère les informations de l'utilisateur connecté

**Route :** `GET /api/volunteers/me`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
```json
{
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "email": "jhondoe@gmail.com",
    "address": "1 rue de la paix",
    "phone": "0123456789",
    "username": "jdoe",
    "avatarUrl": "lien",
    "nbEditionPerformed": 2,
    "tshirtSize": "M",
    "lodging": "proposition",
    "foodRegime": "vegetarien",
    "isAdmin": false
}
```

### update Self

**Description :**
Met à jour les informations de l'utilisateur connecté

**Route :** `PUT /api/volunteers/me`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- Partial de : 
```json
{
    "firstname": "John",
    "lastname": "Doe",
    "email": "jhondoe@gmail.com",
    "address": "1 rue de la paix",
    "phone": "0123456789",
    "username": "jdoe",
    "avatarUrl": "lien",
    "nbEditionPerformed": 2,
    "tshirtSize": "M",
    "lodging": "proposition",
    "foodRegime": "vegetarien"
}
```

**Réponse :**
Soit :
- `200` : si l'utilisateur a été mis à jour
- `400` : si la requête est mal formée

## Festivals

### index

**Description :**
Récupère tous les festivals

**Route :** `GET /api/festivals`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
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
},
{
}
```

### store

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

### show

**Description :**
Récupère un festival en fonction de son id

**Route :** `GET /api/festivals/:id`

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

### update

**Description :**
Mise à jour d'un festival

**Route :** `PUT /api/festivals/:id`

**Body :** 
- `Authorization` : token d'authentification de l'utilisateur 
- `title` : le titre du festival (optionnel)
- `start_date` : la date du début du festival (optionnel)
- `end_date` : la date de fin du festival (optionnel)
- `address` : l'adresse du festival (optionnel)
- `description` : la description du festival (optionnel)
- `poster_path` : le lien de l'affiche du festival (optionnel)

ex : 
```json
{
  "title": "Festival du jeu 2024",
}
```

**Réponse :**
Soit :
- `200` : si le festival a été mis à jour
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

### destroy

**Description :**
Mise à jour d'un festival

**Route :** `DELETE /api/festivals/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
Soit :
- `200` : si le festival a été supprimé
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs


### showCurrent

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

### update

**Description :**
Mise à jour du festival en cours / celui qui arrive

**Route :** `PUT /api/festivals/current`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `title` : le titre du festival
- `start_date` : la date du début du festival
- `end_date` : la date de fin du festival
- `address` : l'adresse du festival
- `description` : la description du festival
- `poster_path` : le lien de l'affiche du festival

**Réponse :**
Soit :
- `200` : si le festival courrant a été mis à jour
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs


## Games

### index

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

### store

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

### show

**Description :**
Récupère un jeu en fonction de son id

**Route :** `GET /api/games/:id`

**Body :**
Rien

**Réponse :**
Soit :
- `200` : si le jeu existe (avec le jeu)
- `404` : si le jeu n'existe pas

### update

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

### destroy

**Description :**
Supprime un jeu

**Route :** `DELETE /api/games/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**

**Réponse :**
Soit :
- `200` : si le jeu a été supprimé
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

### Create multiple games

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

## Zones

### index

**Description :**
Récupère toutes les zones

**Route :** `GET /api/zones`

**Body :**
Rien

**Réponse :**
- `200` : avec la liste des zones : 
```json
[
  {
      "id": "41892825-3726-464c-a5e6-12451102d89b",
      "name" : "TestZone",
      "description": "TestDescription",
      "maxCapacity": 100,
      "animation": true,
      "festivalId": "41892825-3726-464c-a5e6-12451102d89b",
      "created_at": "2024-01-27T18:51:00.874+01:00",
      "updated_at": "2024-01-27T18:51:00.875+01:00"
  },
  {
  ...
  }
]
```

### store

**Description :**
Crée une zone

**Route :** `POST /api/zones/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `name` : le nom de la zone 
- `description` : la description de la zone
- `maxCapacity` : la capacité maximum de la zone
- `animation` : si la zone est animée ou non
- `festivalId` : l'id du festival auquel appartient la zone

ex :
```json
{
    "name" : "TestZone",
    "description": "TestDescription",
    "maxCapacity": 100,
    "animation": true,
    "festivalId": "41892825-3726-464c-a5e6-12451102d89b"
}
```

**Réponse :**
Soit :
- `200` : si la zone a été crée (retourne la zone crée avec son id)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
- `404 Not Found` : si le festival n'existe pas

### show

**Description :**
Récupère une zone en fonction de son id

**Route :** `GET /api/zones/:id`

**Body :**
Rien

**Réponse :**
Soit :
- `200` : si la zone existe (avec la zone)
- `404` : si la zone n'existe pas

### update

**Description :**
Mise à jour d'une zone

**Route :** `PUT /api/zones/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
- `name` : le nom de la zone (optionnel)
- `description` : la description de la zone (optionnel)
- `maxCapacity` : la capacité maximum de la zone (optionnel)
- `animation` : si la zone est animée ou non (optionnel)
- `festivalId` : l'id du festival auquel appartient la zone (optionnel)

ex :
```json
{
    "description": "TestDescription",
    "maxCapacity": 100,
}
```

**Réponse :**
Soit :
- `200` : si la zone a été mise à jour (retourne la zone mise à jour)
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

### destroy

**Description :**
Supprime une zone

**Route :** `DELETE /api/zones/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**

**Réponse :**
Soit :
- `200` : si la zone a été supprimée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action **ou si l'utilisateur n'est pas admin**
- `404 Not Found` : la donnée demandée n'existe pas


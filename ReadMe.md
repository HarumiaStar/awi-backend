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

**Route :** `POST /auth/register`

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

**Route :** `POST /auth/login`

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

**Route :** `POST /auth/logout`

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

**Route :** `GET /auth/hash-seed`

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

**Route :** `GET /volunteers/me`

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

**Route :** `PUT /volunteers/me`

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

**Route :** `GET /festivals`

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
  "created_at": "2024-01-27T18:51:00.874+01:00",
  "updated_at": "2024-01-27T18:51:00.875+01:00"
}
```

### store

**Description :**
Crée un festival

**Route :** `POST /festivals/`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `title` : le titre du festival
- `start_date` : la date du début du festival
- `end_date` : la date de fin du festival
- `address` : l'adresse du festival
- `description` : la description du festival

**Réponse :**
Soit :
- `200` : si le festival a été crée
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

### show

**Description :**
Récupère un festival en fonction de son id

**Route :** `GET /festivals/:id`

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

**Route :** `PUT /festivals/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur
- `title` : le titre du festival
- `start_date` : la date du début du festival
- `end_date` : la date de fin du festival
- `address` : l'adresse du festival
- `description` : la description du festival

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

**Route :** `DELETE /festivals/:id`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
Soit :
- `200` : si le festival a été supprimé
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis pour faire cette action
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs
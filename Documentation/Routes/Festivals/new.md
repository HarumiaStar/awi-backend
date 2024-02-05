# New 
[Retour](./Festivals.md)

**Description :**
Récupère l'ensemble des informations nécessaires pour créer un nouveau festival (créneaux, zones, jeux, etc...)
Attention : certains tests ne sont pas réalisés, il est possible que des erreurs surviennent

**Route :** `GET /api/festivals/new`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur **et être admin**
```json
{
    "festival": {
        "title": "TestFestival",
        "start_date": "13/01/2021",
        "end_date": "14/01/2021",
        "description": "TestDescription",
        "address": "TestAddress",
        "poster_path": "TestPosterPath"
    },
    "games": [
        {
            "idGame": 1,
            "name": "TestGame",
            "author": "TestAuthor",
            "editor": "TestEditor",
            "description": "TestDescription",
            "minPlayer": 2,
            "maxPlayer": 4,
            "minAge": 8,
            "duration": 30,
            "toAnimate": true,
            "recieved": true,
            "type": "TestType",
            "mechanics": "TestMechanics",
            "theme": "TestTheme",
            "tags": "TestTags",
            "image": "TestImage",
            "logo": "TestLogo",
            "video": "TestVideo",
            "manual": "TestManual"
        },
        {
            "idGame": 2,
            "name": "TestGame2",
            "author": "TestAuthor",
            "editor": "TestEditor",
            "description": "TestDescription2",
            "minPlayer": 2,
            "maxPlayer": 4,
            "minAge": 8,
            "duration": 30,
            "toAnimate": true,
            "recieved": true,
            "type": "TestType2",
            "mechanics": "TestMechanics2",
            "theme": "TestTheme2",
            "tags": "TestTags2",
            "image": "TestImage2",
            "logo": "TestLogo2",
            "video": "TestVideo2",
            "manual": "TestManual2"
        },
        {
            "idGame": 3,
            "name": "TestGame3",
            "author": "TestAuthor",
            "editor": "TestEditor",
            "description": "TestDescription3",
            "minPlayer": 2,
            "maxPlayer": 4,
            "minAge": 8,
            "duration": 30,
            "toAnimate": true,
            "recieved": true,
            "type": "TestType3",
            "mechanics": "TestMechanics3",
            "theme": "TestTheme3",
            "tags": "TestTags3",
            "image": "TestImage3",
            "logo": "TestLogo3",
            "video": "TestVideo3",
            "manual": "TestManual3"
        }
    ],
    "zones": [
        {
            "idZone": 1,
            "name": "TestZone",
            "description": "TestDescription",
            "animation": true,
            "maxCapacity": 10
        },
        {
            "idZone": 2,
            "name": "TestZone2",
            "description": "TestDescription2",
            "maxCapacity": 2,
            "animation": false
        },
        {
            "idZone": 3,
            "name": "TestZone3",
            "description": "TestDescription3",
            "maxCapacity": 5,
            "animation": true
        }
    ],
    "slots": [
        {
            "startTime": "13/01/2021 10:00",
            "endTime": "13/01/2021 12:00"
        },
        {
            "startTime": "13/01/2021 14:00",
            "endTime": "13/01/2021 16:00"
        },
        {
            "startTime": "14/01/2021 18:00",
            "endTime": "14/01/2021 20:00"
        }
    ],
    "gameZones": [
        {
            "idJeu": 1,
            "idZone": 1
        },
        {
            "idJeu": 1,
            "idZone": 2
        },
        {
            "idJeu": 2,
            "idZone": 3
        },
        {
            "idJeu": 3,
            "idZone": 1
        }
    ]
}
```

**Réponse :**
Soit :
- `200` : si le festival existe
- `401 Unauthorized` : si l'utilisateur n'est pas connecté
- `403 Forbidden` : si l'utilisateur connecté n'a pas les accès requis
- `404 Not Found` : la donnée demandée n'existe pas
- `422 Unprocessable Entity` : si l'utilisateur oublie un champs

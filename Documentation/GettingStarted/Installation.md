# Installations
[Retour](../README.md)

Le projet fournis un docker-compose pour la base de données, et un script pour l'installation du projet.


## Installation de la base de données

### Prérequis

- Docker
- Docker-compose

### Installation

```bash
docker-compose up
```


## Installation du projet

### Prérequis

- NodeJS
- NPM


### Installation 

#### Installation des node_modules
```bash
npm install
```

#### Installation de la base de données

Pour installer la base de donnée, celle-ci doit être précédement lancée. (Dans le cas d'une utilisation avec le docker-compose fournis, faire `docker-compose up`). Ensuite, il faut lancer les migrations avec la commande suivante :

```bash
npm run migrate
```
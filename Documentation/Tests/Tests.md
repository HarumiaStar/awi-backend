# Tests
[Retour](../README.md)

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
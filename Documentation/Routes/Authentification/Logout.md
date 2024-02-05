# Logout
[Retour](./Authentification.md)

**Route :** `POST /api/auth/logout`

**Body :**
- `Authorization` : token d'authentification de l'utilisateur

**Réponse :**
```json
{ 
    "revoked": true 
}
```
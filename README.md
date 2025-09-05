# Polarfood

## Présentation du projet
Polarfood est une application inspirée de Polarsteps, mais pensée pour les foodies.<br>
Elle permet de documenter, noter et retrouver facilement tous les restaurants et plats testés.


## Fonctionnalités
- Enregistrer un lieu : ajouter un restaurant avec son nom, adresse et type.
- Noter et commenter : attribuer une note globale et laisser un avis.
- Suivi des visites : garder une trace des dates de visite.
- Gestion de compte : inscription, connexion et vérification par email.
- Sécurité : authentification avec token JWT et récupération de mot de passe.


## Endpoints

### Authentification (/auth)
```POST /auth/register``` → Créer un compte utilisateur. \
Exemple de body: 
```
{
  "username": "paul",
  "email": "paul@example.com",
  "password": "mypassword123"
}
```
```POST /auth/login``` → Se connecter.<br>
```POST /auth/forgot-password``` → Envoyer un email de réinitialisation.<br>
```POST /auth/reset-password``` → Réinitialiser le mot de passe.<br>
```GET /auth/verify?token=``` → Vérifier un compte via token.<br>
```GET /auth/reset-password?token=``` → Afficher la page de réinitialisation.<br>

### Lieux (/place)
```POST /place/``` → Créer un lieu. <br>
```
{
  "name": "Pizza Roma",
  "address": "12 rue du Test",
  "city": "Paris",
  "postalCode": "75000",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "placeType": "restaurant"
}
```
```GET /place/:id``` → Récupérer un lieu par ID.<br>
```GET /place/``` → Lister tous les lieux.<br>

### Visites (/visit) (protégé par JWT)
```POST /visit/``` → Créer une visite (ajouter une note/commentaire).<br>
```GET /visit/:id``` → Récupérer une visite par ID.\
```GET /visit/``` → Lister toutes les visites.<br>
```PUT /visit/:id``` → Mettre à jour une visite.<br>
```DELETE /visit/:id``` → Supprimer une visite.<br>


## Lancer le projet

### Frontend (React Native + Expo)
```
cd frontend/
npm install
npx expo start --clear
```
Cela démarre Expo. Possibilité de scanner le QR code avec l’app Expo Go sur un téléphone, ou lancer un émulateur iOS/Android.

### Backend (Node.js + Hono + Drizzle)
```
cd backend/
npm install
npm run dev
```
Le backend sera disponible sur http://localhost:3000
 (ou le port défini dans le .env).
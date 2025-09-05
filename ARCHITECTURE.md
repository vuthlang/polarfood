# Architecture du projet

L’architecture du projet est divisée en deux parties principales : **frontend** (application mobile React Native) et **backend** (API Hono avec Drizzle).  
Chaque partie est organisée de manière modulaire afin de séparer clairement la logique métier, les composants UI et les ressources.

## Frontend

```
frontend/
│
├── app/               ← Écrans/pages de l’application
│   ├── tabs/          ← Navigation par onglets (Home, Profile, Settings…)
│   └── auth/          ← Écrans liés à l’authentification (Login, Register…)
│
├── assets/            ← Ressources statiques
│   ├── fonts/         ← Polices personnalisées
│   └── images/        ← Images, icônes, logos
│
├── components/        ← Composants réutilisables
│   ├── auth/          ← Composants spécifiques à l’auth (formulaires, inputs…)
│   └── ui/            ← Composants génériques d’interface (boutons, modales…)
│
├── constants/         ← Variables globales (couleurs, tailles, clés, etc.)
├── hooks/             ← Hooks personnalisés (useAuth, useFetch, etc.)
├── scripts/           ← Scripts utilitaires (build, génération, migration…)
├── services/          ← Appels API et logique métier (authService, userService…)
└── utils/             ← Fonctions utilitaires pures (formatage de dates, helpers…)
```

## Backend

```
backend/ 
│
├── src/
   ├── models/             ← Drizzle table definitions
   ├── repositories/       ← CRUD + accès DB
   ├── services/           ← logique métier
   ├── controllers/        ← handlers HTTP (signupHandler, etc.)
   ├── schemas/            ← Zod schemas (signupSchema, etc.)
   ├── middleware/         ← JWT, auth, vérification rôle<br />
   ├── routes/             ← fichiers route.ts pour Hono (par module)
   ├── db/                 ← config drizzle + migrations
   ├── utils/              ← helpers (hash, token, etc.)
   └── app.ts              ← point d'entrée Hono
```


## 🧱 Type d’architecture

Le projet adopte une **architecture monolithique modulaire**.

Bien que le projet soit structuré en modules (auth, places, visits, etc.), toutes les fonctionnalités du backend sont regroupées dans **un seul service Hono**, avec une API REST unifiée.
Ce choix est **adapté à la taille et au contexte du projet** (développement solo, durée limitée), tout en maintenant une **séparation claire des fonctionnalités**.

---

## Schéma du découpage backend

```
Route (Controller)
   ↓
Service (Logique métier)
   ↓
Repository (Accès aux données)
```

Exemple :

```
GET /places
↓
place.route.ts → place.service.ts → place.repo.ts
```

---

## Rôles des couches

| Couche                 | Rôle                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Route (Controller)** | Définir les endpoints de l’API. Reçoit les requêtes HTTP, appelle les services appropriés, retourne les réponses |
| **Service**            | Contient la logique métier : validation métier, calculs, vérifications, appels aux repositories                  |
| **Repository**         | Abstraction des accès à la base de données (PostgreSQL). Effectue les requêtes SQL ou ORM                        |

---

##  Design patterns utilisés

| Pattern                               | Description                                      | Pourquoi                                                    |
| ------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| **Controller → Service → Repository** | Séparation claire des responsabilités            | Facilite la maintenance, les tests unitaires, la lisibilité |
| **Middleware (auth, validation)**     | Interception des requêtes avant les routes       | Réutilisable, découplé, logique transversale                |
| **DTO / Schema validation (Zod)**     | Définition explicite des données d'entrée/sortie | Sécurité, robustesse, meilleure DX (dev experience)         |

---

## Justification des choix techniques

| Élément                       | Choix                                          | Justification                                                                                                                                                                    |
| ----------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend**                   | Hono (Node.js, TypeScript)                   | Framework web minimaliste et ultra-rapide, parfait pour créer une API REST modulaire, typée et performante. Son approche middleware-friendly est adaptée à une archi en services |
| **Base de données**           | PostgreSQL                                     | Base relationnelle robuste, idéale pour des données liées (users, places, visits…). Bien supportée côté Node.js                                                                  |
| **Validation**                | Zod                                         | Schéma de validation TS/JS léger, compatible avec Hono. Permet de valider les body en entrée et de typer les données de façon sûre                                               |
| **Auth**                      | JWT (via middleware personnalisé)              | Simple, léger, sécurisé pour une app mobile. Permet de gérer des routes protégées selon le rôle                                                                                  |
| **Stockage des images**       | Stockage local pour le MVP, extensible vers S3 | Simple à mettre en place dans un premier temps, compatible avec une montée en charge                                                                                             |
| **Architecture monolithique** | 🧱                                             | Plus rapide à développer et maintenir dans le cadre d’un projet solo. Structure modulaire pour préparer une éventuelle évolution vers des microservices                          |
| **Frontend**                  | React Native + Expo + Nativewind                | Stack mobile moderne. Expo facilite le développement multiplateforme. UI Kitten fournit un design system scalable avec thèmes intégrés                                           |
| **API consommée par mobile**  | REST (JSON)                                    | Format simple, standard, facilement consommé depuis une app React Native via axios                                                                         |

---

## Résultat attendu

Cette architecture garantit :

* Une séparation nette entre les couches métier, technique et exposition HTTP
* Une scalabilité future via une architecture modulaire
* Une base solide pour ajouter des tests, du cache, de la pagination, ou migrer vers des microservices
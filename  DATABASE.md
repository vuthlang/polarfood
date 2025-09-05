# Architecture de la base de données

## MCD de l'application
![Screenshot de l'application](https://image.noelshack.com/fichiers/2025/36/5/1757089069-screenshot-2025-09-05-at-18-17-44.png)

## Liste des tables 

`users`
| Champ                           | Type                     | Clé |
| ------------------------------- | ------------------------ | --- |
| id                              | integer                  | PK  |
| username                        | character varying        | -   |
| email                           | character varying        | -   |
| password\_hash                  | character varying        | -   |
| role                            | character varying        | -   |
| created\_at                     | timestamp                | -   |
| verification\_token             | character varying(255)   | -   |
| is\_verified                    | boolean                  | -   |
| reset\_password\_token          | character varying(255)   | -   |
| reset\_password\_token\_expires | timestamp with time zone | -   |

<br>


`place`
| Champ       | Type              | Clé |
| ----------- | ----------------- | --- |
| id          | integer           | PK  |
| name        | character varying | -   |
| address     | character varying | -   |
| city        | character varying | -   |
| latitude    | double precision  | -   |
| longitude   | double precision  | -   |
| place\_type | character varying | -   |
| description | text              | -   |
| created\_at | timestamp         | -   |
| categories  | text\[]           | -   |

<br>

`favorite`
| Champ       | Type      | Clé            |
| ----------- | --------- | -------------- |
| id          | integer   | PK             |
| user\_id    | integer   | FK → users(id) |
| place\_id   | integer   | FK → place(id) |
| created\_at | timestamp | -              |
<br>


`saved_place`
| Champ     | Type      | Clé            |
| --------- | --------- | -------------- |
| id        | integer   | PK             |
| user\_id  | integer   | FK → users(id) |
| place\_id | integer   | FK → place(id) |
| note      | text      | -              |
| added\_at | timestamp | -              |
<br>


`visit`
| Champ          | Type      | Clé            |
| -------------- | --------- | -------------- |
| id             | integer   | PK             |
| user\_id       | integer   | FK → users(id) |
| place\_id      | integer   | FK → place(id) |
| visit\_date    | date      | -              |
| global\_rating | integer   | -              |
| comment        | text      | -              |
| created\_at    | timestamp | -              |
<br>

`item`
| Champ       | Type              | Clé            |
| ----------- | ----------------- | -------------- |
| id          | integer           | PK             |
| name        | character varying | -              |
| place\_id   | integer           | FK → place(id) |
| item\_type  | character varying | -              |
| description | text              | -              |
<br>

`item_tried`
| Champ     | Type    | Clé            |
| --------- | ------- | -------------- |
| id        | integer | PK             |
| visit\_id | integer | FK → visit(id) |
| item\_id  | integer | FK → item(id)  |
| rating    | integer | -              |
| comment   | text    | -              |
<br>

`photo`
| Champ        | Type              | Clé            |
| ------------ | ----------------- | -------------- |
| id           | integer           | PK             |
| url          | character varying | -              |
| place\_id    | integer           | FK → place(id) |
| item\_id     | integer           | FK → item(id)  |
| visit\_id    | integer           | FK → visit(id) |
| uploaded\_at | timestamp         | -              |
| description  | text              | -              |

### Exemples JSON
Table User - Créer un user 
```
{
  "username": "paul",
  "email": "paul@gmail.com",
  "password_hash": "hashed_password",
  "role": "user",
}
```

Table Place - Ajouter un nouveau lieu
```
{
  "name": "Central Park",
  "address": "5th Ave",
  "city": "New York",
  "latitude": 40.785091,
  "longitude": -73.968285,
  "place_type": "park",
  "description": "Un parc emblématique de New York",
  "categories": ["nature", "tourisme"]
}
```
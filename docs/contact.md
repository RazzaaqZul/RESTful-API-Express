# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorizaiton : token

Request Body :

```json
{
  "first_name": "Muhammad",
  "lastname": "Razzaaq",
  "email": "razzaaq@gmail.com",
  "phone": "23322222"
}
```

> ID akan di generate secara otomatis menggunakan Auto Increment

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad",
    "lastname": "Razzaaq",
    "email": "razzaaq@gmail.com",
    "phone": "23322222"
  }
}
```

> email dan phone tidak besifat unique dikarenakan bisa saja dalam kontak yang berbeda memiliki email/phone yang sama.

Response Body Error :

```json
{
  "errors": "Email is not valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorizaiton : token

Request Body :

```json
{
  "first_name": "Muhammad",
  "lastname": "Razzaaq Updated",
  "email": "razzaaq@gmail.com",
  "phone": "23322222"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad",
    "lastname": "Razzaaq Updated",
    "email": "razzaaq@gmail.com",
    "phone": "23322222"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorizaiton : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "first_name": "Muhammad",
    "lastname": "Razzaaq Updated",
    "email": "razzaaq@gmail.com",
    "phone": "23322222"
  }
}
```

Response Body Error :

```json
{
  "error": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorizaiton : token

Query params :

- name : Search by first_name or last_name, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10
  Request Body :

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Muhammad",
      "lastname": "Razzaaq Updated",
      "email": "razzaaq@gmail.com",
      "phone": "23322222"
    },
    {
      "id": 2,
      "first_name": "Ahmad",
      "lastname": "Udin",
      "email": "razzaaq@gmail.com",
      "phone": "23322222"
    }
  ],
  "pagging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

```json

```

## Remove Contact API

Endpoint : DELETE /api/contacts/:api

Headers :

- Authorizaiton : token

> Kenapa tidak terdapat request body? karena semua data yang diperlukan, diambil melalui Query Parameter.

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "error": "Contact is not found"
}
```

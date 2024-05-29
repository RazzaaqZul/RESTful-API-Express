# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body:

```json
{
  "username": "razzaaq",
  "password": "rahasia",
  "name": "Muhammad Razzaaq Zulkahfi"
}
```

Response Body Success:

```json
{
  "data": {
    "username": "razzaaq",
    "name": "Muhammad Razzaaq Zulkahfi"
  }
}
```

Response Body Error:

```json
{
  "errors": "Username already registered"
}
```

> Dalam membuat response, terdapat standar yang harus ditetapkan.

## Login User API

Enpoint : POST /api/users/login

Request Body:

```json
{
  "username": "razzaaq",
  "password": "rahasia"
}
```

Response Body Success:

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error:

```json
{
  "errors": "Username or Password wrong"
}
```

## Update User API

> Username tidak bisa di update dan dianggap sebagai ID. Jika ingin meng-update data parsial salah satunya saja (name/password), idealnya menggunakan PATCH karena di update sebagian. Jikalau memakai PUT, makan akan di replace semua datanya.

Endpoint : PATCH /api/users/current

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Muhammad Razzaaq Zulkahfi Updated", // optional
  "password": "new password" // optional
}
```

Response Body Success:

```json
{
  "data": {
    "username": "razzaaq",
    "name": "Muhammad Razzaaq Zulkahfi Updated"
  }
}
```

Response Body Error:

```json
{
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "username": "razzaaq",
    "name": "Muhammad Razzaaq Zulkahfi"
  }
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Authorization : token

Response Body Success:

```json
{
  "data": "OK"
}
```

> Hapus token user ketika DELETE success.

Response Body Error:

```json
{
  "errors": "Unauthorized"
}
```

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

# Address API Spec

## Create Address API

Enpoint : POST /api/contacts/:contactId/addresses

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Update Address API

Enpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan apa",
  "city": "Kota apa",
  "province": "Provinsi apa",
  "country": "Negara apa",
  "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required"
}
```

## Get Address API

Enpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

> Kenapa tidak terdapat request body? karena semua data yang diperlukan, diambil melalui Query Parameter.

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## List Address API

Enpoint : GET /api/contacts/:contactId/addresses

Headers :

- Authorization : token

> Kenapa tidak terdapat request body? karena semua data yang diperlukan, diambil melalui Query Parameter.

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    },
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Kota apa",
      "province": "Provinsi apa",
      "country": "Negara apa",
      "postal_code": "Kode pos"
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Enpoint : POST /api/contacts/:contactId/addresses/:addressId

Headers :

- Authorization : token

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
  "errors": "address is not found"
}
```

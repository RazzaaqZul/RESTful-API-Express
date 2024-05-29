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

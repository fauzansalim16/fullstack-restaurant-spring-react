# User API Spec

## Registrasi User

**Endpoint**: `POST /registrasi`

**Request Body**:

```json
{
  "nama": "string",
  "no telepon": "string",
  "alamat": "string",
  "email": "string",
  "password": "string"
}
```

## Login User

**Endpoint**: `POST /login`

**Request Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

## Get User

**Endpoint**: `GET /users/current`

## Update User

**Endpoint**: `PATCH /users/current`

## Logout

**Endpoint**: `DELETE /logout`

**Request Header**:
token

# Menu

## Create Menu

**Endpoint**: `POST /menu`

**Request Header**:
token

**Request Body**:

```json
{
  "namaMakanan": "string",
  "gambar": "string",
  "harga": "string"
}
```

## Update Menu

**Endpoint**: `PUT /menu/{idMenu}`

**Request Header**:
token

**Request Body**:

```json
{
  "namaMakanan": "string",
  "gambar": "string",
  "harga": "string"
}
```

## Remove Menu

**Endpoint**: `DELETE /menu/{idMenu}`

**Request Header**:
token

# Pesanan

## Create Pesanan

**Endpoint**: `POST /pesananku`

**Request Header**:
token

# Manage operations over microservice fx-gateway-pos
PRE- CONDITION
## DataBase
- you have to run mongo database and up port 27022 
## Install 
- npm i o yarn install

DESCRIPTION

## Endpoints

- [GET] /check/live
- [GET] /check/ready
- [GET] /check/health
- [GET] /api-docs
- [POST] /api/tokens
- [GET] /api/tokens

## Environment

```plaintext
MONGO_URI = mongodb://localhost:27024/gateway-POS
PORT = 5002
ENVIRONMENT = dev
FILENAME = 'tc.json'
EXPIRATION_MINUTE = 3
PREFIX_ECOMMERCE = pk_test
SECRET_CRYPTO= crypto_pos
```

## Load Data TC 
```plaintext

execute next command to load TC

Example :
npm run load:tc

```

## Execution

```plaintext
npm i

- docker-compose -f docker-compose.dev.yml up

```

## Tests

Execute tests with this commands

All tests

```plaintext
npm run test
```

## Documentation

- ./documentacion/Cuestionario_pruebaTecnica (Cuestionario)
- ./documentacion/Token.postman_collection (archivo postman)

All tests

```plaintext
npm run test
```
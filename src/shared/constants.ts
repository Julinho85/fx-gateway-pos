/**
 * Config or "Constants" file. This is a reflection (but in code) of .env or docker-compose environments section
 */

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const EXPIRATION_MINUTE = process.env.EXPIRATION_MINUTE;
const PATTERN_ECOMMERCE = `^${process.env.PREFIX_ECOMMERCE}\\_[a-zA-Z\\d]+$`;
const SECRET_CRYPTO = process.env.SECRET_CRYPTO;

const SWAGGER_OPTIONS = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "'fx-gateway-pos' Express Microservice",
      version: "0.1.0",
      description: "MicroService for operating with others systems",
      contact: {
        name: "Julio Hernandez (jhernandezloya@gmail.com) ",
        email: "jhernandezloya@gmail.com",
      },
    },
  },
  apis: [
    "./src/**/**/infrastructure/*.ts",
    "./src/shared/swagger/*.yaml",
    "./src/**/**/domain/*.ts",
  ],
};

export {
  MONGO_URI,
  PORT,
  SWAGGER_OPTIONS,
  EXPIRATION_MINUTE,
  PATTERN_ECOMMERCE,
  SECRET_CRYPTO
};

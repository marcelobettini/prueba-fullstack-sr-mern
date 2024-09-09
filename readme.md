# Proyecto de Software

## Instrucciones

### Carpeta `api`

1. Ejecuta `npm install` para instalar las dependencias.
2. Ejecuta `npm run dev` para iniciar el servidor de desarrollo.
3. Asegúrate de ejecutar `mongod` para que la base de datos MongoDB sea accesible.
4. La documentación de la API está disponible en el endpoint `/api-docs`.

### Carpeta `apiClient`

1. Ejecuta `npm install` para instalar las dependencias.
2. Ejecuta `npm run dev` para iniciar el servidor de desarrollo del FrontEnd.

## Resumen del Trabajo Realizado

- **API completa** según los requerimientos, realizada con Node JS, Express y MongoDB.
  - Implementación de conceptos de arquitectura limpia y escalable.
  - Separación de responsabilidades.
  - Manejo centralizado de errores.
  - Middlewares de autenticación y validaciones.
  - Limitación de peticiones.
  - Documentación con Swagger, etc.

- **Frontend** con React.
  - Custom Hooks para peticiones asíncronas y manejo de token.
  - Rutas protegidas.
  - Discriminación de acceso de acuerdo a roles.
  - Listados, etc.

Como trabajo a tiempo completo de lunes a viernes, tuve el fin de semana para esta tarea. Dado que el domingo solo tenía medio día y tenía planes en familia, decidí dedicar todo el sábado a realizar una API robusta y relegar un poco el frontend, en el cual solo pude implementar algunas funcionalidades importantes debido a la lógica que manejan por detrás.

Entendiendo que esto no es un producto real sino una prueba, consideré más importante poner el mayor esfuerzo en el backend, que suele ser la parte neurálgica de cualquier proyecto y donde se pueden evaluar con más detalle los conocimientos. Me hubiera encantado tener más tiempo para desarrollar un frontend completo y agradable, asimismo, para realizar unit-testing con Jest o Mocha en el backend (aunque lo probé profusamente con Postman).

Cordial saludo y gracias por la oportunidad.


# RESTful API en Node.js

Un servidor RESTful construido con Node.js, Express y MongoDB. Incluye autenticación JWT, Google Sign-In, validaciones, middlewares personalizados y modelos para Users, Categories, Products y Roles.

## Características

- **Modelos**:
  - User (Usuarios)
  - Category (Categorías)
  - Product (Productos)
  - Role (Roles)
- **Autenticación**:
  - JSON Web Tokens (JWT)
  - Google Sign-In (OAuth2)
- **Validaciones**:
  - Campos obligatorios y formatos (usando `express-validator`)
  - Middlewares personalizados para validaciones adicionales
- **Seguridad**:
  - Protección de rutas con JWT
  - Validación de roles de usuario (Ej: Admin, User)
- **Extra**:
  - Configuración mediante variables de entorno (`.env`)
  - Paginación en consultas
  - Manejo centralizado de errores
  - CORS configurado
  - Subida de archivos y conseguir imagenes de los modelos product y user
  - Sistema de busqueda (Search)

---

## Instalación

1. Clonar repositorio:
   ```bash
   git clone [url-del-repositorio]
   ```

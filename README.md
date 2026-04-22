# Orsetto Contact API

API de NestJS para gestionar contactos y consultas del sistema Orsetto.

## Descripción

API de NestJS para gestionar contactos y consultas del sistema Orsetto. 

Implementada con **principios SOLID** y arquitectura limpia (Domain-Driven Design) para garantizar código mantenible y escalable.

## Requisitos Previos

- **Node.js** >= 18
- **npm** >= 9
- **PostgreSQL** >= 12
- **.env** configurado con variables de entorno

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar base de datos
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate
```

## Ejecución

```bash
# Desarrollo (watch mode)
npm run start:dev

# Producción
npm run start:prod

# Debug
npm run start:debug
```

La API estará disponible en `http://localhost:3000`

## Endpoints Principales

**POST** `/contact` - Crear nuevo contacto

**GET** `/contact` - Listar contactos (requiere autenticación)

**POST** `/auth/login` - Obtener token de acceso

## Testing

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Base de Datos

### Modelo Contact

```sql
CREATE TABLE "Contact" (
  id        VARCHAR(36) PRIMARY KEY DEFAULT uuid(),
  name      VARCHAR(255) NOT NULL,
  email     VARCHAR(255) NOT NULL,
  message   TEXT NOT NULL,
  source    VARCHAR(50) DEFAULT 'web',
  status    VARCHAR(50) DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Stack Tecnológico

- **Framework**: NestJS 11
- **Lenguaje**: TypeScript 5.7
- **ORM**: Prisma 5
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT + Passport
- **Email**: EmailJS
- **Testing**: Jest + Supertest
- **Validación**: Class Validator
- **Linting**: ESLint + Prettier

## Estructura del Proyecto

```
src/
├── application/        # Lógica de negocio (DTOs, Use Cases)
├── domain/            # Entidades y repositorios (core)
├── infrastructure/    # Implementaciones técnicas (BD, HTTP, Email)
├── config/            # Configuración de la aplicación
├── app.module.ts      # Módulo principal
└── main.ts            # Entry point
```

## Licencia

UNLICENSED

## Contribuciones

Para reportar bugs o sugerir features, abre un issue en el repositorio.

---

**Construido con ❤️ para Orsetto**

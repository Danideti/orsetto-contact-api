# Orsetto Contact API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  API REST para gestionar contactos y consultas del sistema Orsetto.
  <br />
  Construida con <a href="https://nestjs.com/" target="_blank">NestJS</a> y <a href="https://www.prisma.io/" target="_blank">Prisma ORM</a>
</p>

## Descripción

**Orsetto Contact API** es un servicio backend que permite:
- 📧 Recibir y almacenar contactos/consultas
- 🔐 Autenticación JWT para acceso seguro
- 📨 Envío de emails mediante EmailJS
- 📋 Gestión y consulta de contactos almacenados
- ✅ Validación de datos con DTOs
- 🏗️ Arquitectura limpia (Domain-Driven Design)

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

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/orsetto_contacts"

JWT_SECRET="tu_secreto_jwt_super_seguro"

EMAILJS_SERVICE_ID="your_emailjs_service_id"
EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
EMAILJS_PUBLIC_KEY="your_emailjs_public_key"

PORT=3000
NODE_ENV="development"
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

### 📧 Contactos

**POST** `/contact` - Crear nuevo contacto
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "message": "Tengo una consulta..."
}
```

**GET** `/contact` - Listar todos los contactos (requiere JWT)
```
Headers: Authorization: Bearer {token}
```

### 🔐 Autenticación

**POST** `/auth/login` - Obtener token JWT
```json
{
  "email": "admin@orsetto.com",
  "password": "tu_contraseña"
}
```

Retorna:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

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

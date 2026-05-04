# Multi-stage Dockerfile for production using node:20-alpine

#############################
# Install dependencies stage
#############################
FROM node:20-alpine AS deps
WORKDIR /app

# Install system packages required for building native modules and Prisma
RUN apk add --no-cache --virtual .gyp python3 build-base libc6-compat openssl

# Copy package manifests and install all dependencies (including dev deps for build)
COPY package*.json ./
RUN npm ci

#############################
# Builder: generate Prisma client + build TypeScript
#############################
FROM node:20-alpine AS builder
WORKDIR /app

# Copy installed node_modules from deps stage to avoid re-installing
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and compile the app
ENV NODE_ENV=development
RUN npx prisma generate && npm run build

#############################
# Production image
#############################
FROM node:20-alpine AS runner
WORKDIR /app

# Set production env
ENV NODE_ENV=production

# Install only production dependencies to keep image small
COPY package*.json ./
RUN apk add --no-cache libc6-compat openssl && npm ci --omit=dev && rm -rf /var/cache/apk/*

# Copy build output and Prisma schema (if any)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY prisma ./prisma

# Expose default Nest port (adjust if your app uses a different one)
EXPOSE 3000

# Start the app using the production start script
CMD ["node", "dist/main"]

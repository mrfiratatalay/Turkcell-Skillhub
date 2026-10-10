# syntax=docker/dockerfile:1.7
# ---- build: the full-stack bundle; the API is reached on the same origin through nginx ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
# "api" talks to the Spring Boot backend; the Vercel portfolio build keeps the browser-only "demo" mode.
ARG VITE_DATA_MODE=api
ENV VITE_DATA_MODE=$VITE_DATA_MODE
RUN npm run build

# ---- runtime: static files plus a reverse proxy to the API (one public port, no CORS) ----
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

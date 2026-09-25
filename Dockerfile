# syntax=docker/dockerfile:1

# Compile on the builder's own architecture. ng build emits static files, which
# are copied into each target image below, so Node is not emulated per platform.
FROM --platform=$BUILDPLATFORM node:24-bookworm-slim AS build

WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

COPY package.json package-lock.json ./
RUN corepack enable && corepack prepare npm@12.0.2 --activate && npm ci

COPY . .
RUN npm run build

FROM caddy:2.11-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist/yggdrasil-frontend/browser /srv

EXPOSE 8080

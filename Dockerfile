# Base image with dependencies
FROM node:26-alpine AS builder

WORKDIR /app

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock .yarnrc.yml ./
RUN npm install -g corepack && corepack enable && corepack prepare yarn@4.17.0 --activate && yarn install --immutable

COPY . .

RUN --mount=type=secret,id=_env cat /run/secrets/_env > .env

RUN yarn run standalone

# Production runner
FROM node:26-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache icu-data-full
WORKDIR /home/node/code
COPY --from=builder --chown=node:node /app/.next/standalone .
USER node

EXPOSE 3000
CMD [ "node", "server.js" ]

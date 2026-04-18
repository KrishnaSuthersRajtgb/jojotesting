FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/

RUN pnpm install --frozen-lockfile

COPY apps/api ./apps/api
COPY tsconfig.base.json ./

WORKDIR /app/apps/api

RUN pnpm prisma generate

EXPOSE 3001

CMD ["pnpm", "dev"]
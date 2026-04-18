FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/

RUN pnpm install --frozen-lockfile

COPY apps/web ./apps/web
COPY tsconfig.base.json ./

WORKDIR /app/apps/web

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]
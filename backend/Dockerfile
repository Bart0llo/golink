FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install -g pnpm
RUN pnpm i

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

ENV PORT=4000
EXPOSE 4000
CMD [  "npm", "run", "start:migrate:prod" ]

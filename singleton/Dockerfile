FROM node:22.11-alpine3.19  as base

FROM base as workspace
RUN npm i pnpm -g

WORKDIR /web-apps
COPY . .
COPY ./docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# 构建
RUN pnpm i
RUN pnpm build

# 部署
RUN npm i pm2 -g


EXPOSE 3020
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]

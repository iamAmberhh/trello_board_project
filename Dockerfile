FROM node:16.20.2-slim

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

EXPOSE 5003

WORKDIR /var/www/app

COPY . /var/www/app
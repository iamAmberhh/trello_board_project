#!/bin/sh
cd /var/www/app
pnpm install
pnpm init
if [ ! -e "./package.json" ]; then
  pnpm init
fi
pnpm run dev




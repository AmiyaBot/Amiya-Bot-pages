#!/usr/bin/env sh

set -e

npm run build
cd dist

echo 'www.amiya.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:AmiyaBot/Amiya-Bot-pages.git master:gh-pages

cd -

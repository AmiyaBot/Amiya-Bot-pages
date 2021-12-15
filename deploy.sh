#!/usr/bin/env sh

set -e


echo 'www.amiya.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:AmiyaBot/Amiya-Bot-pages.git master:main

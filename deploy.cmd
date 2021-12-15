@echo off
echo. Pushing...
git init>nul
git add -A>nul
git commit -m 'deploy'>nul
git push -f git@github.com:AmiyaBot/Amiya-Bot-pages.git master:main>nul
cls
echo. Push complete!
pause

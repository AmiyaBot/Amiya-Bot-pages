@echo off
start cmd /k "npm run build&&exit"
cd dist
for /l %%a in (1,1,25) do (
echo Waiting Build.
timeout -t 1 -NOBREAK>nul
cls
echo Waiting Build..
timeout -t 1 -NOBREAK>nul
cls
echo Waiting Build...
timeout -t 1 -NOBREAK>nul
cls
)
cls
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:AmiyaBot/Amiya-Bot-pages.git master:gh-pages
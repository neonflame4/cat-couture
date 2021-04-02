#!/usr/bin/env sh

# Update to Latest Dependencies
git reset --hard
git checkout master
git pull
npm install

echo "Are you sure you want to deploy the latest build? y/n"
read isDeployAllowed

if $isDeployAllowed == 'y'; then
  mv dist dist.old
  find ./dist.old -mindepth 1 ! -regex '^./dist\.old/\.well-known\(/.*\)?' -delete
  npm run build
  echo "Prod build complete."

  echo "Deploying app ..."
  mv -f dist/* dist.old
  rm -rf dist
  mv dist.old dist
fi

rm -rf node_modules

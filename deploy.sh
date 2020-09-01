#!/usr/bin/env sh

# Update to Latest Dependencies
git pull
npm install

mv dist dist.old
npm run build
mv -f dist/* dist.old
rm -rf dist
mv dist.old dist

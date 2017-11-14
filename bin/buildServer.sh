#!/bin/sh

cp ./src/server.js ./dist/server.js;
cp -r ./src/home/ ./dist/home;
cp -r ./src/auth/ ./dist/auth;
cp -r ./src/user/ ./dist/user;

# rsync -av --exclude='src/public' ./src/ ./dist/

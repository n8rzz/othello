#!/bin/sh

cp ./src/server.js ./dist/server.js;
cp -r ./src/home/ ./dist/home;
cp -r ./src/auth/ ./dist/auth;
cp -r ./src/user/ ./dist/user;
cp -r ./src/middleware/ ./dist/middleware;

# rsync -av --exclude='src/public' ./src/ ./dist/

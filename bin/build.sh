#!/bin/sh

npm run clean;
npm run build:client;
npm run build:scripts:server;
npm run copy:assets;

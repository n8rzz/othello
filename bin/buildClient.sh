#!/bin/sh

browserify -d src/public/script/app.ts -p [ tsify --noImplicitAny ] > dist/public/script/bundle.js

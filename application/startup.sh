#!/bin/bash

cd backend && npm install && npm run start:watch &
cd frontend && npm install && npm run start &

trap "killall background" EXIT;
wait;
#!/usr/bin/env bash
docker build --rm -f "Dockerfile" -t products-api:latest .
docker run -p 4000:4000 products-api

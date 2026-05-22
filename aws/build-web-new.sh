#!/bin/bash
docker compose rm -s -v -f nationalactswww-new
docker rmi 804363746695.dkr.ecr.us-east-1.amazonaws.com/nationalactsvip/nationalactswww-new:latest
docker pull 804363746695.dkr.ecr.us-east-1.amazonaws.com/nationalactsvip/nationalactswww-new:latest
docker compose up -d --no-deps nationalactswww-new
#!/bin/bash
docker compose rm -s -v -f nationalactswww
docker rmi 804363746695.dkr.ecr.us-east-1.amazonaws.com/nationalactsvip/nationalactswww:latest
docker pull 804363746695.dkr.ecr.us-east-1.amazonaws.com/nationalactsvip/nationalactswww:latest
docker compose up -d --no-deps nationalactswww
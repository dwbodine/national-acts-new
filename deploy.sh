#!/bin/bash

set -euo pipefail

WEBSITES_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOCAL_IMAGE="nationalactsvip/nationalactswww:latest"
ECR_IMAGE="804363746695.dkr.ecr.us-east-1.amazonaws.com/nationalactsvip/nationalactswww:latest"

aws ecr get-login-password --region us-east-1 --profile deployment_nationalacts | docker login --username AWS --password-stdin 804363746695.dkr.ecr.us-east-1.amazonaws.com
DOCKER_BUILDKIT=1 NEXT_TELEMETRY_DISABLED=1 docker build --no-cache --secret id=_env,src="$WEBSITES_ROOT/.env" -t "$LOCAL_IMAGE" "$WEBSITES_ROOT"
docker tag "$LOCAL_IMAGE" "$ECR_IMAGE"
docker push "$ECR_IMAGE"

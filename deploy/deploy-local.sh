#!/bin/bash

# Import config
# source: imports all vars and functions from the target file.
# dirname: gets the directory portion of the script's path
# $0: the current script's filename
source "$(dirname "$0")/../config.sh"

#===========================#
#      ANSI COLOR CODES     #
#===========================#
BLUE="\033[1;34m"
GREEN="\033[1;32m"
RESET="\033[0m"

#===========================#
# CLEANUP OLD DOCKER IMAGES #
#===========================#
echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Cleaning up Docker images and volumes...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker system prune -a --volumes -f
echo -e "${GREEN}Docker cleanup done.${RESET}"

#===========================#
#    GENERATE .env FILES    #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Generating backend-side .env files...${RESET}"
echo -e "${BLUE}=============================================${RESET}"

cat <<END > ./server/.env
ALLOWED_ORIGIN=http://$FRONTEND_PUBLIC_IP
END

echo -e "${GREEN}Backend .env generated.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Generating frontend-side .env files...${RESET}"
echo -e "${BLUE}=============================================${RESET}"

cat <<END > ./client/.env
REACT_APP_BACKEND_URL=http://$BACKEND_PUBLIC_IP:4001
END

echo -e "${GREEN}Frontend .env generated.${RESET}"

#===========================#
#   BUILD & PUSH IMAGES     #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Building backend Docker image...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker buildx build --platform linux/amd64 -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest ./server --push
echo -e "${GREEN}Backend image pushed to DockerHub.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Building frontend Docker image...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker buildx build --platform linux/amd64 -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest ./client --push
echo -e "${GREEN}Frontend image pushed to DockerHub.${RESET}"

#===========================#
#   UPDATE BACKEND EC2      #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Updating backend EC2 server...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
ssh -i "$PEM_KEY_PATH" $BACKEND_EC2 "DOCKERHUB_USER=$DOCKERHUB_USER BACKEND_IMAGE=$BACKEND_IMAGE bash -s" < ./deploy/update-backend.sh
echo -e "${GREEN}Backend EC2 updated.${RESET}"

#===========================#
#   UPDATE FRONTEND EC2     #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Updating frontend EC2 server...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
ssh -i "$PEM_KEY_PATH" $FRONTEND_EC2 "DOCKERHUB_USER=$DOCKERHUB_USER FRONTEND_IMAGE=$FRONTEND_IMAGE bash -s" < ./deploy/update-frontend.sh
echo -e "${GREEN}Frontend EC2 updated.${RESET}"

#===========================#
#         COMPLETE!         #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Deployment Complete!${RESET}"
echo -e "${BLUE}=============================================${RESET}"
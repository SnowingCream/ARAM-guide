#!/bin/bash

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
#    UPDATE BACKEND IMAGE   #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Stopping current backend container...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker ps -q --filter "ancestor=$DOCKERHUB_USER/$BACKEND_IMAGE:latest" | xargs -r docker stop
echo -e "${GREEN}Backend container stopped.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Pulling latest backend image...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker pull $DOCKERHUB_USER/$BACKEND_IMAGE:latest
echo -e "${GREEN}Latest backend image pulled.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Running new backend container...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker run -d -p 4001:4001 $DOCKERHUB_USER/$BACKEND_IMAGE:latest
echo -e "${GREEN}Backend updated and running!${RESET}"
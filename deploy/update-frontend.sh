#!/bin/bash

#===========================#
#      ANSI COLOR CODES     #
#===========================#
BLUE="\033[1;34m"
GREEN="\033[1;32m"
RESET="\033[0m"

#===========================#
#   UPDATE FRONTEND IMAGE   #
#===========================#

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Stopping current frontend container...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker ps -q --filter "ancestor=$DOCKERHUB_USER/$FRONTEND_IMAGE:latest" | xargs -r docker stop
echo -e "${GREEN}Frontend container stopped.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Pulling latest frontend image...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker pull $DOCKERHUB_USER/$FRONTEND_IMAGE:latest
echo -e "${GREEN}Latest frontend image pulled.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Running new frontend container...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker run -d -p 80:80 $DOCKERHUB_USER/$FRONTEND_IMAGE:latest
echo -e "${GREEN}Frontend updated and running!${RESET}"
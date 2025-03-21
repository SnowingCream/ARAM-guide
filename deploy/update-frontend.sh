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
#   UPDATE FRONTEND IMAGE   #
#===========================#

# not necessary anymore because no longer running the frontend as a Docker container on port 80.
# instead, extract the react build files from the docker image, copy them to nginx directory, then serve them via nginx directly.
# echo -e "${BLUE}=============================================${RESET}"
# echo -e "${GREEN}Stopping current frontend container...${RESET}"
# echo -e "${BLUE}=============================================${RESET}"
# docker ps -q --filter "ancestor=$DOCKERHUB_USER/$FRONTEND_IMAGE:latest" | xargs -r docker stop
# echo -e "${GREEN}Frontend container stopped.${RESET}"

echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Pulling latest frontend image...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker pull $DOCKERHUB_USER/$FRONTEND_IMAGE:latest
echo -e "${GREEN}Latest frontend image pulled.${RESET}"

#===========================#
#   Extract React Build     #
#===========================#
echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Extracting frontend build files...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
docker create --name temp-frontend $DOCKERHUB_USER/$FRONTEND_IMAGE:latest
docker cp temp-frontend:/app/build /tmp/frontend-build
docker rm temp-frontend
echo -e "${GREEN}Build files extracted.${RESET}"

#===========================#
#  Update Nginx HTML Dir    #
#===========================#
echo -e "${BLUE}=============================================${RESET}"
echo -e "${GREEN}Copying build files to Nginx directory...${RESET}"
echo -e "${BLUE}=============================================${RESET}"
# clean up old nginx files
sudo rm -rf /var/www/html/*
# copy contents from /tmp/frontend-build/build/*
sudo cp -r /tmp/frontend-build/build/* /var/www/html/
sudo systemctl restart nginx
echo -e "${GREEN}Nginx restarted, new frontend deployed.${RESET}"
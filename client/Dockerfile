# generated from chatGPT

# Build stage
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the frontend
COPY . .
RUN npm run build
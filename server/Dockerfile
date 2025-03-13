# generated from chatGPT

# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose backend port (Change this based on your setup)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
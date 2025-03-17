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
# just a documentation, the main thing is the port setup in server.js
EXPOSE 4001

# Start the server
CMD ["npm", "start"]
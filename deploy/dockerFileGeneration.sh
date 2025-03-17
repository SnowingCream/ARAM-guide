# generated by ChatGPT
#!/bin/bash

DOCKERHUB_USER="snowingcream"
BACKEND_IMAGE="backend"
FRONTEND_IMAGE="frontend"
BACKEND_EC2="ubuntu@<BACKEND_EC2_PUBLIC_IP>"
FRONTEND_EC2="ubuntu@<FRONTEND_EC2_PUBLIC_IP>"
PEM_KEY_PATH="/path/to/your/key.pem"

# build dockerFile for backend and push it to DockerHub
echo "🚀 Building backend Docker image..."
docker buildx build --platform linux/amd64 -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest ./server --push

# build dockerFile for frontend and push it to DockerHub
echo "🚀 Building frontend Docker image..."
docker buildx build --platform linux/amd64 -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest ./client --push

echo "✅ Images built and pushed to DockerHub!"

# updating script is in local machine; run in EC2 backend
echo "🟢 Updating backend EC2..."
ssh -i $PEM_KEY_PATH $BACKEND_EC2 'bash -s' < ./deploy/update-backend.sh

# updating script is in local machine; run in EC2 frontend
echo "🟢 Updating frontend EC2..."
ssh -i $PEM_KEY_PATH $FRONTEND_EC2 'bash -s' < ./deploy/update-frontend.sh

echo "🎉 Deployment Complete!"
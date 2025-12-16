#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Update package lists
echo "Updating package lists..."
sudo apt-get update -y

# Install Java (OpenJDK 17)
echo "Installing OpenJDK 17..."
sudo apt-get install -y openjdk-17-jdk

# Install Node.js (version 18.x) and npm
echo "Installing Node.js 18.x..."
sudo apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update -y
sudo apt-get install -y nodejs

# Install Nginx
echo "Installing Nginx..."
sudo apt-get install -y nginx

# Install MySQL Server
echo "Installing MySQL Server..."
sudo apt-get install -y mysql-server

# Install Docker and Docker Compose
echo "Installing Docker and Docker Compose..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add the current user to the docker group to run docker commands without sudo
sudo usermod -aG docker ${USER}

echo "----------------------------------------------------"
echo "--- Environment setup completed successfully! ---"
echo "----------------------------------------------------"
echo ""
echo "Next steps:"
echo "1. IMPORTANT: Log out and log back in for the user group changes to take effect, which will allow you to run 'docker' commands without 'sudo'."
echo "2. Create a .env file in the root of the project with your database credentials:"
echo "   MYSQL_ROOT_PASSWORD=your_super_secret_root_password"
echo "   MYSQL_USER=your_database_user"
echo "   MYSQL_PASSWORD=your_super_secret_password"
echo ""
echo "3. Once you have logged back in and created the .env file, you can build and run the entire application using Docker Compose:"
echo "   docker-compose up --build -d"
echo ""
echo "4. The application will be available at http://localhost"
echo ""

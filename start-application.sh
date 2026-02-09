#!/bin/bash

echo "Starting application..."

if [ ! -d "node_modules" ]; then
   echo "Installing dependencies..."
   npm install

   if [ $? -ne 0 ]; then
      echo "Failed to install dependencies."
      exit 1
   fi
else
   echo "Dependencies already installed."
fi

if [ ! -f ".env" ]; then
   echo "Creating .env file..."

   cat<<EOF > .env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_ADMIN_EMAIL=
PASSWORD_SALT=
JWT_SECRET=
EOF
   echo "Created .env file."
   echo "You need to configure the .env file in order to start the application."
else
   echo ".env file already exists."
   echo "Application started."
   npm run start
fi
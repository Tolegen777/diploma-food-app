# Use an official Node.js runtime as a parent image
FROM node:14.16.0-alpine3.10

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the application
RUN npm run build

# Set the command to run the application
CMD [ "npm", "start" ]

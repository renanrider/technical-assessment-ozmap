# Use official Node.js apline image as the base image
FROM node:21.7.1-alpine3.19

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code to workdir
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]

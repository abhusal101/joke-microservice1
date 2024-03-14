# Use the official Node.js Alpine image as base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

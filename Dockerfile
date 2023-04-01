# Base image
FROM node:16.13.0-alpine3.14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port that the application will be running on
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
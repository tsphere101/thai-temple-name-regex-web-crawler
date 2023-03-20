# Set the base image to the official Node.js 16.x image
FROM node:19-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install --production --force

# Copy the rest of the application code to the working directory
COPY . .

# Set the environment variable to production
ENV NODE_ENV=production

# Build the Next.js application
RUN npm run build

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
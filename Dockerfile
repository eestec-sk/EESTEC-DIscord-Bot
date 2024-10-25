# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the bot code
COPY . .

# Build the TypeScript code
RUN npm run build

# Run the bot
CMD ["npm", "start"]

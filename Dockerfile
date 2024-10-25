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

# Set environment variables (make sure to replace BOT_TOKEN if you don't use .env)
ENV NODE_ENV=production

# Run the bot
CMD ["node", "bot.js"]

From node:20-alpine
# Set the working directory
WORKDIR /Backend
#Copy
COPY . .
# Install dependencies
RUN npm install

# Copy package.json andd pnpm-lock.yaml first (for better caching)
COPY package.json package-lock.json ./


# Build the TypeScript code
RUN npm run build

# Expose the port your app runs on (8080)
EXPOSE 5000

# Run the built application
CMD ["node", "dist/server.js"]







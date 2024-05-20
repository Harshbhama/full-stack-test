# Use the latest LTS version of Node.js for better stability
FROM node:20.5.1

# Set the timezone to IST
ENV TZ=Asia/Kolkata

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install build tools for native module compilation
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Install Node.js dependencies
RUN npm install

# Rebuild native modules in case they need to be recompiled
RUN npm rebuild

# Copy Prisma schema files
COPY prisma ./prisma

# Run Prisma generate to create client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the application
CMD ["node", "index.js"]
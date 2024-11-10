# Use the specified Node.js version as the base image
FROM node:20.16.0

# Set the working directory
WORKDIR /app

# Copy the package files to install dependencies first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variable for API key (value can be set at runtime)
ENV OPEN_API_KEY=${OPEN_API_KEY}

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
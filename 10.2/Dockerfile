# Use Node.js 16 as the base image
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Install netcat
RUN apt-get update && apt-get install -y netcat

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the wait-for.sh script and make it executable
COPY wait-for.sh /usr/src/app/wait-for.sh
RUN chmod +x /usr/src/app/wait-for.sh

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application using the wait-for script
CMD ["./wait-for.sh", "mongo", "node index.js"]

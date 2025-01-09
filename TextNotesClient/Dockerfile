# Use a base image
FROM node:18-alpine

# set work dir
WORKDIR /app

# Copy the files package.json e package-lock.json
COPY text-notes-client/package*.json ./

# install dependencies
RUN npm install

# copy alll files
COPY text-notes-client/ ./

# expose port
EXPOSE 5174

# execution command
CMD ["npm", "run", "dev"]
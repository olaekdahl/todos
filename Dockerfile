# Write a dockerfile that builds an image with the following requirements:
# - Use the latest node image as a base image
# - Set the working directory to /app
# - Copy the current directory into the container at /app
# - Install the dependencies for the app
# - Expose port 3000
# - Set the command to run when the container starts to npm start

FROM node:latest
WORKDIR /app
COPY server.js todoRepository.js database.json package*.json /app/
COPY web/ /app/web/
RUN npm install
EXPOSE 4000 80 443
CMD ["npm", "start"]

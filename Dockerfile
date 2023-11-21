# Base image
FROM node:16-alpine
ENV AWS_ACCESS_KEY_ID=AKIAYZRP6K2YQI56HBWW
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_DEFAULT_REGION=ap-southeast-1
# Create app directory
WORKDIR /aws/backend-nest

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install 

RUN npm i -g @nestjs/cli

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
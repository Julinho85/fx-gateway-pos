FROM node:17.1.0-slim
ENV TZ=UTC

# home directory
WORKDIR /home/app

# node packages
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY jest.config.js ./
RUN npm install 

# copy app
COPY ./src ./src
RUN npm run build 

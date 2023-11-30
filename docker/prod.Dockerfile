FROM node:17.1.0-slim
ENV TZ=UTC

# home directory
WORKDIR /home/app

# copy app
COPY . .

EXPOSE 3500

# start
CMD ["npm", "start"]
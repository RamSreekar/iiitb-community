FROM node:16
FROM node:18-alpine


ARG SECRET_ACCESS_TOKEN
ARG SECRET_REFRESH_TOKEN
ARG JWT_SECRET
ARG NODE_ENV
ARG DATABASE_NAME
ARG DATABASE_URL
ARG MONGODB_PASSWORD
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g nodemon

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

ENV SECRET_ACCESS_TOKEN=$SECRET_ACCESS_TOKEN
ENV SECRET_REFRESH_TOKEN=$SECRET_REFRESH_TOKEN
ENV JWT_SECRET=$JWT_SECRET
ENV NODE_ENV=$NODE_ENV
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_URL=$DATABASE_URL
ENV MONGODB_PASSWORD=$MONGODB_PASSWORD

EXPOSE 3333

CMD [ "npm","run","devStart" ]
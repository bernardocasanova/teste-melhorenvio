FROM node:latest

LABEL maintainer="Bernardo Casanova"

WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build

CMD ["npm", "run", "dev"]

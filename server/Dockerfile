FROM node:14-alpine as base

WORKDIR /server
COPY package*.json /
EXPOSE 5000

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "bin/www"]
# importar de otra forma
# para pasar a prod
FROM node:14 as dev

# Create app directory
WORKDIR /server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code 
# for production RUN 
# npm ci --only=production
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "nodemon", "bin/www" ]
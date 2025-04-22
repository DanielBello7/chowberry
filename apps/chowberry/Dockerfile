# start the first build stage
FROM node:20.13.1-alpine

# switch to the /app directory in the image 
WORKDIR /app

# copy into the /app directory package.json
COPY package*.json ./

# install packages
RUN npm install

# copy everything else from outside into the /app
COPY . .

# run the build operation
RUN npm run build

# expose 3000 port
EXPOSE 3002
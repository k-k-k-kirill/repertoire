# pull official base image
FROM node:16.13.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn install

# add app
COPY . ./

# build typescript into js
RUN yarn build

# expose port
EXPOSE 3000

# start app
CMD [ "yarn", "watch" ]
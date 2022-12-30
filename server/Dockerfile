FROM node:16 AS BUILD_IMAGE

RUN npm install -g clean-modules

WORKDIR /app

COPY ./server /app/

# install 
RUN npm install 

# build
RUN npm run build

# remove development dependencies
RUN npm prune --production

# run clean-modules
RUN clean-modules --exclude "**/@lumieducation/**" --yes

FROM node:16-alpine

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "build/src/app.js" ]
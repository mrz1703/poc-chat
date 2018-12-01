FROM node:10-alpine

# This shit is supposed to install python
RUN apk --no-cache add git g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /app

COPY package*.json ./
RUN npm ci
ENV NODE_PATH=.

COPY . .

CMD ["node", "index.js"]
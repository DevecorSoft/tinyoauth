FROM node:lts-alpine
ADD build/server/index.js index.js
ENTRYPOINT ["node", "/index.js"]
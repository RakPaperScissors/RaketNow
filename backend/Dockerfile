FROM node:24-alpine3.21 AS backend

WORKDIR /app

COPY  . . 

RUN npm install     

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

FROM node:24-alpine3.21 AS backend

WORKDIR /app

COPY  . . 

RUN npm install     

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

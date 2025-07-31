FROM node:latest

WORKDIR /app

COPY index.js .
RUN npm install express dotenv cors

EXPOSE 3000

CMD ["node", "index.js"]
FROM node:8

WORKDIR /www/stream-requests-relay
COPY . .
RUN npm install && npm run build

EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 3004

CMD ["node", "./bin/www"]

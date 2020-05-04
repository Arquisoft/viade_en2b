FROM node:12.14.1
COPY . /app
WORKDIR /app
RUN npm install
CMD ["npm", "start"]
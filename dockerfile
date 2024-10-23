FROM node:18
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5172
CMD ["npm", "run", "dev"]
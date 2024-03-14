FROM node:16
WORKDIR ./
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production

CMD ./backend & npm start


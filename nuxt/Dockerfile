FROM node:12.16.1-alpine3.11

WORKDIR /nuxt

RUN apk update && \
  apk upgrade && \
  apk add --no-cache git && \
  npm install -g @vue/cli nuxt create-nuxt-app && \
  npm install
COPY . .
RUN npm run build

EXPOSE 3000

CMD npm run start
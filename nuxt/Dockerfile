FROM node:12.16.1-alpine3.11

WORKDIR /nuxt

COPY package.json package-lock.json ./

RUN apk update && \
  apk upgrade && \
  apk add --no-cache git && \
  npm install -g @vue/cli nuxt create-nuxt-app @nuxt/typescript-runtime && \
  npm install
COPY . .
RUN npm run build

EXPOSE 3000

CMD npm run start
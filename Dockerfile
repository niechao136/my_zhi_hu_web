FROM node:20-alpine as build
RUN npm config set registry https://registry.npmmirror.com \
    && npm i npm -g

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
ENTRYPOINT nginx -g "daemon off;"

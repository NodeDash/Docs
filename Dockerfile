FROM node:22 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine-slim
WORKDIR /
COPY --from=build /app/build /usr/share/nginx/html
COPY conf/nginx /etc/nginx/conf.d/default.conf

FROM nginx:stable-alpine

RUN ["rm", "-rf", "/etc/nginx/conf.d/*"]
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

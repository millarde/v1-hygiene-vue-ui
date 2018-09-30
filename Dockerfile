FROM nginx
COPY . /usr/share/nginx/html
ENV V1SERVICEURL="http://localhost:8088"
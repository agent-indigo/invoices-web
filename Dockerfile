FROM nginx:latest
ADD build/. /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
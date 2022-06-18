# to avoid build error, node v17 has build error
# https://github.com/facebook/create-react-app/issues/11565
FROM node:16-alpine as builder

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
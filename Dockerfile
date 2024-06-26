# using staged builds
FROM node:18-buster as builder
# make the directory where the project files will be stored
RUN mkdir -p /cars
# set it as the working directory so that we don't need to keep referencing it
WORKDIR /cars
# Copy the package.json file
COPY package.json package.json
# install project dependencies
RUN npm install
# copy project files 
# make sure to set up .dockerignore to copy only necessary files
COPY . .
# run the build command which will build and export html files
RUN npm run build

# bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*
# copy built assets from 'builder' stage
COPY --from=builder /cars/out /usr/share/nginx/html
# add nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# expose port 80 for nginx
EXPOSE 81
# start nginx
CMD ["nginx", "-g", "daemon off;"]
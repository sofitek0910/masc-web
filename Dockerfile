FROM node:14.15.4-alpine3.12 AS builder
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add git yarn

WORKDIR /ace-audio

COPY ./ace-audio/package*.json /ace-audio/
COPY ./ace-audio/yarn.lock /ace-audio
RUN  yarn install

COPY ./ace-audio /ace-audio
RUN yarn build


FROM tiangolo/uwsgi-nginx-flask:python3.8 AS nginx-flask

# If STATIC_INDEX is 1, serve / with /static/index.html directly (or the static URL configured)
#ENV STATIC_INDEX 1
ENV STATIC_INDEX 0
COPY ./app /app
COPY --from=builder /ace-audio/build /app/static/
COPY --from=builder /ace-audio/build/static /app/static/
RUN rm -r /app/static/static/

COPY ./nginx.conf /root

RUN rm -rf /etc/nginx/conf.d/nginx.conf \
    && ln -s /root/nginx.conf /etc/nginx/conf.d/nginx.conf \
    && rm -rf /app/templates/index.html \
    && ln -s /app/static/index.html /app/templates/index.html

# EXPOSE 8080

# CMD ["uwsgi", "--socket", "0.0.0.0:8080", "--protocol=http", "-w", "main:app" ]
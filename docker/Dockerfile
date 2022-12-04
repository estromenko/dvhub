FROM python:3.10-alpine3.17

WORKDIR /var/www/app

COPY . /var/www/app

RUN apk --update add \
    gcc \
    git \
    linux-headers \
    musl-dev \
    nginx \
    nodejs \
    npm \
    postgresql-client \
    postgresql-dev

RUN cd /var/www/app && \
    pip3 install -r requirements.txt && \
    npm i --location=global yarn && yarn && yarn build && \
    echo yes | env SECRET_KEY=secret python3 manage.py collectstatic

COPY docker/config/uwsgi.ini /var/www/app

COPY docker/config/uwsgi_params /etc/nginx

COPY docker/config/default.conf /etc/nginx/http.d

COPY docker/docker-entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

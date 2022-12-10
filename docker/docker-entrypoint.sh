#!/bin/sh

export REPOSITORIES_DIR=/data/repositories

mkdir -p /data/repositories
chown -R nginx:nginx /data/repositories

case "${TYPE}" in
frontend)
    mkdir -p /run/nginx
    nginx -g 'daemon off;'

    ;;
backend)
    python3 manage.py migrate
    uwsgi --ini /var/www/app/uwsgi.ini

    ;;
*)
    >&2 echo "Unknown ${TYPE} service type"
    exit 1
    ;;
esac

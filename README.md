# DVHub

Damn vulnerable development platform

## Project requirements
* NodeJS 18 and higher
* Python 3.10 and higher

## Local setup

1) Setup python virtual environment
```bash
$ virtualenv -p python3.10 .venv
$ source .venv/bin/activate
```

2) Install python dependencies:
```bash
$ pip3 install -r requirements.txt
$ pip3 install -r requirements-dev.txt  # Only if you need development tools
```

3) Run PostgreSQL database inside docker container:
```bash
$ docker run --rm --name dvhub_postgres -v /srv/_dvhub_postgres:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:15
$ docker run --rm -it --link dvhub_postgres:dvhub_postgres -e PGPASSWORD=secret postgres:15 createdb -h dvhub_postgres -U postgres dvhub
```

4) Create `.env` file like this:
```dotenv
SECRET_KEY=secret
DEBUG=true
```

5) Apply migrations:
```bash
$ python3 manage.py migrate
```

6) Install frontend dependencies:
```bash
$ yarn
```

7) Run watcher and development server in separated terminals:
```bash
$ yarn dev

# In another terminal
$ python3 manage.py runserver
```

8) Go to `http://localhost:3000/`


## Production setup

1) Go to `docker` directory and create `.env` file like this:
```dotenv
SECRET_KEY=secret
DEBUG=false
```

2) Inside `docker` directory run command below:
```bash
$ docker-compose up -d --build
```

3) Go to `http://127.0.0.1/`

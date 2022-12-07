# Humble Kanban - backend

##### (All paths are given relative to `services/`)

## create a virutal environment
`python3 -m venv env`

## activate env
`env\Scripts\activate`

### for Linux
`source env/bin/activate`

## install dependencies
`pip install fastapi[all]`

### for Linux
`pip install 'fastapi[all]'`

## or
`pip install -r requirements.txt`

## run on local server
`uvicorn app.main:app --reload`

---
# Database setup
1. Install [PostgreSQL ](https://www.postgresql.org/download/) (installing PgAdmin is optional)


2. Create a database and define your environment variables in a `.env` file. To ge an idea of what variables are required - see `humble-kanban\source\services\app\config.py` 

3. `.env` file should be located in `humble-kanban\source\services\`

4. `cd` to `humble-kanban\source\services\`

5. run `alembic revision --autogenerate -m "init"` to generate a migration file

6. run `alembic upgrade head` to generate all tables

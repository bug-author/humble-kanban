# Humble Kanban - backend

##### (All paths are given relative to `services/`)

## create a virutal environment
`python3 -m venv env`

## activate env
`app\env\Scripts\activate`

## install dependencies
`pip install fastapi[all]`

## or
`pip install -r requirements.txt`

## run on local server
`uvicorn app.main:app --reload`

---
# Database setup
1. Install [PostgreSQL ](https://www.postgresql.org/download/) (installing PgAdmin is optional)

<br>

2. Create a database and define your environment variables in a `.env` file. To ge an idea of what variables are required - see `humble-kanban\source\services\app\config.py` 

<br>

3. `.env` file should be located in `humble-kanban\source\services\`

4. `cd` to ``humble-kanban\source\services\` and run `alembic upgrade head` to generate all tables

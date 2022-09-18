
### All paths are given relative to `services/`

# create a virutal environment
`python3 -m venv env`

# activate env
`app\env\Scripts\activate`

# install dependencies
`pip install fastapi[all]`

# or
`pip install -r requirements.txt`

# run on local server
`uvicorn app.main:app --reload`

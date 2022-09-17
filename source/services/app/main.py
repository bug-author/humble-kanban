from fastAPI import fastAPI


app = FastAPI()


@app.get
def index():
    return {'message': 'Hello, world!'}

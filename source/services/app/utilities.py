from passlib.context import CryptContext

# use the bcrypt hashing algorithm
password_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def hash(password: str):
    return password_context.hash(password)


def verify(candidate: str, hashed: str):
    return password_context.verify(candidate, hashed)

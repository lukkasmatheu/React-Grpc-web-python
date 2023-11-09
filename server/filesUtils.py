import json
import hashlib


def save_file(pathName,jsonItem):
    with open(pathName,"w") as f:
            f.write(jsonItem)

def read_file(pathName):
    with open(pathName,"r") as f:
            return json.loads(f.read())

def criptoPassword(password):
    sha256 = hashlib.sha256()
    sha256.update(password.encode('utf-8'))
    password_hex = sha256.hexdigest()
    return password_hex 
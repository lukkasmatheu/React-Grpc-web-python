from flask import Flask, Response, render_template, stream_with_context
from gevent.pywsgi import WSGIServer
from flask_cors import CORS 
import time
import json
#python3 -m grpc.tools.protoc -I=. --python_out=../server --grpc_python_out=../server grpcModels.proto

app = Flask(__name__)
CORS(app,resources={r"/*": {"origins": "http://localhost:3000"}})

notification = []

@app.route('/')
def hello_world():
    def helo():
        try:
            while True:
                _data = json.dumps({"message": "ok open"})
                print("Data a ser enviada:" + _data + "\n")
                yield f"data: {_data}\nevent: notification\n\n"
                time.sleep(2)
        except GeneratorExit:
            print("Conexão fechada pelo cliente")
            
    return Response(helo(), mimetype='text/event-stream')
  
@app.route("/notification")
def listen():
    def respond_to_client():
        try:
            while True:
                    if notification:
                        _data = json.dumps({"message": notification.pop(0)})
                        print("Data a ser enviada:" + _data + "\n")
                    else:
                        _data = json.dumps({"message": "ok"})
                    yield f"data: {_data}\nevent: notification\n\n"
                    time.sleep(1)
        except GeneratorExit:
            print("Conexão fechada pelo cliente")
    return Response(respond_to_client(), mimetype='text/event-stream')
  

def send_notification(message):
    notification.append(message)


def serverSSE():
    http_server = WSGIServer(("localhost", 7779), app)
    print("Iniciando SSE")
    http_server.serve_forever()

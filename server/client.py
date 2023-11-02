
from __future__ import print_function

import grpc
import grpcModels_pb2
import grpcModels_pb2_grpc

def run():
    with grpc.insecure_channel("localhost:50051") as channel:
            stub = grpcModels_pb2_grpc.LoginServiceStub(channel)
            stub.Login(grpcModels_pb2.LoginRequest(name="Lucas",senha="12345213"))

run()
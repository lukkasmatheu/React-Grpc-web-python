from concurrent import futures
import grpc
import grpcModels_pb2
import grpcModels_pb2_grpc
from service import ServerController

userAcess= ''
class LoginService(grpcModels_pb2_grpc.LoginServiceServicer):
    __controller = ServerController()
    def __init__(self, *args, **kwargs):
        pass
    def Login(self,request,context):
        response = self.__controller.login(request)
        return grpcModels_pb2.MessageResponse(response = response)
    def CreateUser (self,request,context):
        response = self.__controller.register(request)
        return grpcModels_pb2.MessageResponse(response = response)

class ProductService(grpcModels_pb2_grpc.ProductServiceServicer):
    __controller = ServerController()
    def __init__(self, *args, **kwargs):
        pass
    def CreateProduct(self, request, context):
        response = self.__controller.create_product(request)
        return grpcModels_pb2.MessageResponse(response = response)
    def UpdateProduct(self, request, context):
        response = self.__controller.update_product(request)
        return grpcModels_pb2.MessageResponse(response = response)
    def RemoveProduct(self, request, context):
        response = self.__controller.remove_product(request)
        return grpcModels_pb2.MessageResponse(response = response)

class ReportService(grpcModels_pb2_grpc.ReportServiceServicer):
    __controller = ServerController()
    def __init__(self, *args, **kwargs):
        pass
    def GetStock(self, request, context):
        response = self.__controller.get_stock()
        return grpcModels_pb2.ReportResponse(message = response)
    def GetProductWithoutStock(self, request, context):
        return grpcModels_pb2.ReportResponse(message = self.__controller.show_products_without_stock_period(request.period))
    def GetProductWithoutOut(self, request, context):
        return grpcModels_pb2.ReportResponse(message = self.__controller.show_input_output_stock(request.period))


server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
grpcModels_pb2_grpc.add_LoginServiceServicer_to_server(LoginService(),server)
grpcModels_pb2_grpc.add_ProductServiceServicer_to_server(ProductService(),server)
grpcModels_pb2_grpc.add_ReportServiceServicer_to_server(ReportService(),server)
server.add_insecure_port('[::]:50051')
server.start()
print ('server started')
server.wait_for_termination()



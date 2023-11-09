# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: grpcModels.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x10grpcModels.proto\"+\n\x0cLoginRequest\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\r\n\x05senha\x18\x02 \x01(\t\"?\n\x11\x43reateUserRequest\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\r\n\x05\x63\x61rgo\x18\x02 \x01(\t\x12\r\n\x05senha\x18\x03 \x01(\t\"7\n\x07History\x12\x0e\n\x06\x61\x63tion\x18\x01 \x01(\t\x12\x0c\n\x04\x64\x61te\x18\x02 \x01(\t\x12\x0e\n\x06reason\x18\x03 \x01(\t\"\x8a\x01\n\x07Product\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\x0e\n\x06\x61mount\x18\x04 \x01(\t\x12\r\n\x05price\x18\x05 \x01(\t\x12\x16\n\x0eminimalStorage\x18\x06 \x01(\x05\x12\x19\n\x07history\x18\x07 \x03(\x0b\x32\x08.History\"\x1f\n\rReportRequest\x12\x0e\n\x06period\x18\x01 \x01(\x05\"!\n\x0eReportResponse\x12\x0f\n\x07message\x18\x01 \x03(\t\"#\n\x0fMessageResponse\x12\x10\n\x08response\x18\x01 \x01(\t\"\x07\n\x05\x45mpty\"4\n\x14RemoveProductRequest\x12\n\n\x02id\x18\x01 \x01(\t\x12\x10\n\x08quantity\x18\x02 \x01(\x05\x32l\n\x0cLoginService\x12\x32\n\nCreateUser\x12\x12.CreateUserRequest\x1a\x10.MessageResponse\x12(\n\x05Login\x12\r.LoginRequest\x1a\x10.MessageResponse2\xa4\x01\n\x0eProductService\x12+\n\rCreateProduct\x12\x08.Product\x1a\x10.MessageResponse\x12+\n\rUpdateProduct\x12\x08.Product\x1a\x10.MessageResponse\x12\x38\n\rRemoveProduct\x12\x15.RemoveProductRequest\x1a\x10.MessageResponse2\xa8\x01\n\rReportService\x12#\n\x08GetStock\x12\x06.Empty\x1a\x0f.ReportResponse\x12\x39\n\x16GetProductWithoutStock\x12\x0e.ReportRequest\x1a\x0f.ReportResponse\x12\x37\n\x14GetProductWithoutOut\x12\x0e.ReportRequest\x1a\x0f.ReportResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'grpcModels_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_LOGINREQUEST']._serialized_start=20
  _globals['_LOGINREQUEST']._serialized_end=63
  _globals['_CREATEUSERREQUEST']._serialized_start=65
  _globals['_CREATEUSERREQUEST']._serialized_end=128
  _globals['_HISTORY']._serialized_start=130
  _globals['_HISTORY']._serialized_end=185
  _globals['_PRODUCT']._serialized_start=188
  _globals['_PRODUCT']._serialized_end=326
  _globals['_REPORTREQUEST']._serialized_start=328
  _globals['_REPORTREQUEST']._serialized_end=359
  _globals['_REPORTRESPONSE']._serialized_start=361
  _globals['_REPORTRESPONSE']._serialized_end=394
  _globals['_MESSAGERESPONSE']._serialized_start=396
  _globals['_MESSAGERESPONSE']._serialized_end=431
  _globals['_EMPTY']._serialized_start=433
  _globals['_EMPTY']._serialized_end=440
  _globals['_REMOVEPRODUCTREQUEST']._serialized_start=442
  _globals['_REMOVEPRODUCTREQUEST']._serialized_end=494
  _globals['_LOGINSERVICE']._serialized_start=496
  _globals['_LOGINSERVICE']._serialized_end=604
  _globals['_PRODUCTSERVICE']._serialized_start=607
  _globals['_PRODUCTSERVICE']._serialized_end=771
  _globals['_REPORTSERVICE']._serialized_start=774
  _globals['_REPORTSERVICE']._serialized_end=942
# @@protoc_insertion_point(module_scope)

# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: course_info.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x11\x63ourse_info.proto\" \n\x11\x43ourseInfoRequest\x12\x0b\n\x03url\x18\x01 \x01(\t\"0\n\x0f\x43ourseInfoReply\x12\x0e\n\x06status\x18\x01 \x01(\x08\x12\r\n\x05\x65rror\x18\x02 \x01(\t2E\n\nCourseInfo\x12\x37\n\rGetCourseInfo\x12\x12.CourseInfoRequest\x1a\x10.CourseInfoReply\"\x00\x62\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'course_info_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _COURSEINFOREQUEST._serialized_start=21
  _COURSEINFOREQUEST._serialized_end=53
  _COURSEINFOREPLY._serialized_start=55
  _COURSEINFOREPLY._serialized_end=103
  _COURSEINFO._serialized_start=105
  _COURSEINFO._serialized_end=174
# @@protoc_insertion_point(module_scope)

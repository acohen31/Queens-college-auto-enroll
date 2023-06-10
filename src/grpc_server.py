import course_info_pb2
import course_info_pb2_grpc
from status import get_status
import grpc
from concurrent import futures

class CourseInfoServicer(course_info_pb2_grpc.CourseInfoServicer):
    def __init__(self):
        ''

    def GetCourseInfo(self, request, context):
        is_open,error = get_status(request.url)
        return course_info_pb2.CourseInfoReply(status=is_open,error=error)

def serve():
    print('gRPC server is running...')
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    course_info_pb2_grpc.add_CourseInfoServicer_to_server(
        CourseInfoServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    serve()


        
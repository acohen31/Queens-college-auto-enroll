import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader"
const PROTO_PATH = 'course_info.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const courseInfo = grpc.loadPackageDefinition(packageDefinition);
export const client = new courseInfo.CourseInfo('localhost:50051', grpc.credentials.createInsecure());
export const getCourseInfo = (url) => {
    return new Promise((resolve, reject) => {
        client.getCourseInfo({ url: url }, (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(response.status)
            }
        })
    })
};



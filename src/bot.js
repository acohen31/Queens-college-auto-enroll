import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader"
const PROTO_PATH = 'course_info.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, 
        {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
       });
const courseInfo = grpc.loadPackageDefinition(packageDefinition);
const client = new courseInfo.CourseInfo('localhost:50051', grpc.credentials.createInsecure());

client.getCourseInfo({url:'https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController?class_number_searched=MjU1MTE=&session_searched=MQ==&term_searched=MTIzOQ==&inst_searched=UXVlZW5zIENvbGxlZ2U='},(err,response)=>{
    if(err){
        console.log(err)
    }else{
        console.log(response.status)
    }
})
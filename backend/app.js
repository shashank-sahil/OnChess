import http from "http";
import { reqType } from "./requestHandler.js";

const HOST = 'localhost';
const PORT = 3000;


const server = http.createServer((req,res)=>{
    const request = new reqType(req);
   if(request.verb == "GET"){

   }
   if(request.verb == "POST"){
    
   }

})

server.listen(PORT ,HOST,()=>{
    console.log(`Listening on http://${HOST}:${PORT}/`)
})
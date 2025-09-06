import http from "http";
import { reqType } from "./requestHandler.js";

import { getAuthClient, getAuthUrl } from "./googleAuth.js";




const HOST = 'localhost';
const PORT = 3000;


const server = http.createServer((req,res)=>{
    const request = new reqType(req);
   if(request.verb == "GET"){
    if( request.url == "/login/google"){
    const authUrl = getAuthUrl();
    res.writeHead(302, { Location: authUrl });
    res.end();

    }
    if( request.url == "/auth/callback"){
      
    }




   }



   if(request.verb == "POST"){

   }

})

server.listen(PORT ,HOST,()=>{
    console.log(`Listening on http://${HOST}:${PORT}/`)
})
import http from "http";
import { reqType } from "./requestHandler.js";
import { getTokens, getAuthClient, getAuthUrl ,parseJwt} from "./googleAuth.js";
import cors from 'cors';



const HOST = 'localhost';
const PORT = 3000;



const server = http.createServer((req, res) => {
  
// Always set these headers for every request
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Credentials', 'true');

if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
}

    const request = new reqType(req);
    console.log(request.url.pathname)


    if (request.verb == "GET") {
        if (request.url.pathname == "/login/google") {
            const authUrl = getAuthUrl();
            res.writeHead(302, { Location: authUrl });
            res.end();

        }
        if (request.url.pathname == "/auth/callback") {
            let code = request.url.query.code;
            getTokens(code, (resJSON) => {
           
            console.log(`Hello ${parseJwt(resJSON.id_token).name}!` );

            res.writeHead(200,{"Content-Type": "text/html"})
            res.end(`Hello ${parseJwt(resJSON.id_token).name}!`)

            })






        }




    }



    if (request.verb == "POST") {

    }

})

server.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}/login/google`)
})
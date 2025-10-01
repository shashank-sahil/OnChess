import http from "http";
import { reqType } from "./requestHandler.js";
import {
  getTokens,
  getAuthClient,
  getAuthUrl,
  parseJwt,
} from "./googleAuth.js";

const HOST = "localhost";
const PORT = 3000;

const server = http.createServer((req, res) => {
  const request = new reqType(req);
  console.log(request.url.pathname);

  if (request.verb == "GET") {
    if (request.url.pathname == "/login/google") {
      const authUrl = getAuthUrl();
      res.writeHead(302, { Location: authUrl });
      res.end();
    }
    if (request.url.pathname == "/auth/callback") {
      let code = request.url.query.code;
      getTokens(code, (resJSON) => {
        console.log(`Hello ${parseJwt(resJSON.id_token).name}!`);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`Hello ${parseJwt(resJSON.id_token).name}!`);
      });
    }
    if (request.url.pathname == "/createGame") {
    }
  }

  if (request.verb == "POST") {
  }
});

server.listen(PORT, HOST, () => {
  console.log(`HTTP Server listening on http://${HOST}:${PORT}/login/google`);
  console.log(`Socket.IO server is ready for connections`);
});

import { google } from "googleapis";
import querystring from "querystring";
import http from "https";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI

);


// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  "openid",
  "email",
  "profile"
];


export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    prompt: 'consent',
    prompt: 'select_account',

    // If you only need one scope, you can pass it as a string
    scope: scopes
  });

}
export function getAuthClient() {
  return oauth2Client;
}



export function getTokens(code, callback) {

  const postData = querystring.stringify({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code"
  })


  const configuration = {
    hostname: "oauth2.googleapis.com",
    path: "/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": postData.length,
    },
  };
  const rq = http.request(configuration, (res) => {
    let body = "";
    res.on("data", (chunk) => {
      body += chunk
    });
    res.on("end", () => {
      callback(JSON.parse(body));
    })
  })
  rq.on("error", (e) => console.error("Error:", e));
  rq.write(postData)
  rq.end();
}


export function parseJwt(token) {
  const base64Url = token.split('.')[1]; // payload part
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const buff = Buffer.from(base64, 'base64');
  return JSON.parse(buff.toString('utf8'));
}
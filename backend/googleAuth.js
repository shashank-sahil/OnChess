import { google } from "googleapis";
const CLIENT_ID = '299740158819-edl0fm3ab7bo4epgef173nirsi88sfal.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/auth/callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar'
];


export function getAuthUrl(){
    return oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope, you can pass it as a string
  scope: scopes
});

}
export function getAuthClient(){
      return oauth2Client;
}
// src/config/oidcConfig.ts
import { WebStorageStateStore } from "oidc-client-ts";

const isProd = window.location.origin.includes("cloudfront.net");

export const oidcConfig = {
  //authority: "https://smartorderpro.auth.ap-south-1.amazoncognito.com", // ✅ Hosted UI domain
  authority:"https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_iX353eob7",
  client_id: "6g9i83psniun5oe6h65lvs10nm",
  redirect_uri: isProd
    ? "https://d3ud2zj4au6k7a.cloudfront.net/callback"
    : "http://localhost:5173/callback",
  post_logout_redirect_uri: isProd
    ? "https://d3ud2zj4au6k7a.cloudfront.net"
    : "http://localhost:5173",

  response_type: "code", // ✅ Authorization Code Flow
  scope: "openid profile email aws.cognito.signin.user.admin",

  loadUserInfo: true, // ✅ Needed to get full user info
  automaticSilentRenew: true,

  // ✅ Store tokens in localStorage to persist across refresh
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};


















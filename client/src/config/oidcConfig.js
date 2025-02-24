import { WebStorageStateStore } from "oidc-client-ts";

export const oidcConfig = {
  authority: "http://localhost:5001", //identity server
  client_id: "book_bazaar_client",
  client_name: "book_bazaar_client",
  redirect_uri: "https://localhost:5173/",
  response_type: "code",
  post_logout_redirect_uri: "http://localhost:5173/sign-in",
  userStore: new WebStorageStateStore({ store: window.localStorage })
}

import auth0 from "auth0-js";

const isBrowser = typeof window !== "undefined";

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      protocol: "oauth2",
      responseType: "token id_token",
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      scope: "openid profile"
    })
  : {};

let user = {};
const tokens = {
  idToken: false,
  accessToken: false
};

export const login = () => {
  if (!isBrowser) return;
  auth.authorize();
};

export const isAuthenticated = () => !!tokens.idToken;

const handleResult = (cb = () => {}) => (err, authResult) => {
  if (err) {
    if (err.error === "login_required") {
      login();
    }
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    setSession(authResult);
    auth.client.userInfo(tokens.accessToken, (_, userProfile) => {
      user = userProfile;
      cb(authResult.idToken);
    });
  }
};

export const logout = () => {
  tokens.idToken = false;
  tokens.accessToken = false;

  auth.logout({
    redirectTo: process.env.AUTH0_LOGOUT
  });
};

export const checkSession = callback => {
  auth.checkSession({}, handleResult(callback));
};

const setSession = ({ accessToken, idToken }) => {
  tokens.accessToken = accessToken;
  tokens.idToken = idToken;
};

export const handleAuthentication = () => {
  console.log("RAN");
  auth.parseHash(handleResult());
};

export const getProfile = () => {
  return user;
};

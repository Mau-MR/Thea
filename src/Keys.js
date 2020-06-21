require("dotenv").config({ path: "../.env" });

const {
  REACT_APP_KEY,
  REACT_APP_DOMAIN,
  REACT_APP_URL,
  REACT_APP_ID,
  REACT_APP_BUCKET,
  REACT_APP_SENDERID,
  REACT_APP_APPID,
  REACT_APP_MEASUREMENTID,
} = process.env;
class Keys {
  constructor() {
    this.firebaseConfig = {
      apiKey: REACT_APP_KEY,
      authDomain: REACT_APP_DOMAIN,
      databaseURL: REACT_APP_URL,
      projectId: REACT_APP_ID,
      storageBucket: REACT_APP_BUCKET,
      messagingSenderId: REACT_APP_SENDERID,
      appId: REACT_APP_APPID,
      measurementId: REACT_APP_MEASUREMENTID,
    };
  }

  getFirebaseConfig() {
    return this.firebaseConfig;
  }
}
export default new Keys();

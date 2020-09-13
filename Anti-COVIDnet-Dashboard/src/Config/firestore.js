import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  type: "service_account",
  projectId: "python-firebase-upload",
  private_key_id: "c62596b24ad8431b65ec478293cd4dc76b1b0087",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCqBIaZKP45hyiG\njousSlpFshIgX9MlvZdn+e0MZB6rI/UEYLGGD1eo1be2fUNqqJobBUpwQHv616Yh\nisQ6c76jIfq+CpfHIbF7zPVXtflx1OQHZSGFyZzAMuuZtvgzTCmpkeWAC+Q7Jg2R\n+PHGmQ0MQ9GGLxjA3uMv56GOnVqLlPMr8I6CzGcrBX4uplIGx2OEfsd2/kY5ohPh\nc7VB9amvFKidKqQWFtjuaiGydKMBynBhddolKkqLM9htcmJ89JPKACOYRmoW7MHE\nNLt//784RFJ9qBMv8k/rP1KA+UEhdHkGYNB2eu8N5vL+j6mjtvxSJcf1pyckR3UG\nRynrbgh5AgMBAAECgf9Jd+syBCTXdzBr9O0mZnrb4zcyBjaX+HWU2Ms2r40RJ1iZ\nq68K31Zh/viEQ1z+mhz90Ct6lmL84nNHy09AcwPOOsC/npQ32Ld5Z/gdDuXb6sMe\n7vSte5Hg/CATLJ3UjPTz8bfavUjCxo7WpVzVFQ4uXqAL/A4WSjqiWNXXaufVqLN/\nq6LixOwCnxypTcpyPbdBzhL4/zePUrUKxZWE72BnED2yNXJVFHDNzqDI3LNagg9+\nrQjprY4y9TSCuKN1WonG0sChWA1ybi9g/nt+MdzeolkL4EjShYLKM/+N4SvmfX45\nFHdrdzyxtPxRFIFusCTUOQKP87j/LiWgyTp0n2ECgYEA2E1B23lLyzZIPzdepvcY\nT3N044okJ6QXLKXoFr6jgNYCEd9QDswQpdC/cd+l10RaPrSxo7xzRpdybh4AhGj4\nby7AY108VIm6PYvTTqBGQ/Z1Gqfk6LV643k609xJjmXl1S3/4eoyZQIKjBBoJAjH\nV1OfLxGMWc2CD+AKlhSmBdkCgYEAyTim3bfb4i3pzKFGCxjd2oHN0xV5WujCHQ8M\nDOrVcBf7Z5G2YkiERCmIId76zGXi8Sl4pUgdMxkKPiAs92gt548hmZOe7BeBeDkf\ngScNacCDy4VoJkI4K8wP+iSI/ilkp2bRTpWyVi/b/Gz9aTpzqZVAraMblslBclIS\nGTW3U6ECgYEArZFJEIGD1XwoeznGJTrQcijWmiPmoTymL/ithVrSvvZ70LWee1E6\n5qPci9cIL/Y0aG78wMPeyL2MYFqI1beZ6zXbwaA2Yivmm66REF3CJJUnIQ2qvSWr\nh89m6kyxZafUxrzTwQf6Cl2Z8wzTVF8K/sMmUFHHiuRCwtRoCkhldPkCgYBd8xR9\n+uUwMm2x/C6e6cpTxj1aa/FQT9KqDKd8tHxZLOlVzwPP2bnftWB5KAoDOyL9pHZO\n/V+cxvkwToeQMFUWg46VjQYrh0IM5ubdv2UU1izy7mPVUR+22z0udrZ7rMnxGyFo\nxp4QfaIBtsWOxxrPt/8N01UDTw4+mTEYEit5YQKBgH3N7aK14TBXNS3nLl+EnME2\noWMjTS7ZJKlG82B1JYqpD0udpHD4va1VwTZjSOu9d2Z7bPAZO/I85pfV6uUU1zrV\nbuN/t/zsShq8UMF7izLURPwBLbtCov7NldolSVMBNikn1V14ODQBfD8y3BxaA9Xq\n7Q9c162fTm9eQ0WFfvBb\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-rmqdn@python-firebase-upload.iam.gserviceaccount.com",
  client_id: "114350067662445658127",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rmqdn%40python-firebase-upload.iam.gserviceaccount.com",
});

const db = firebaseApp.firestore();

export { db };

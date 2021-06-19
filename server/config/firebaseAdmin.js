// env vars
require('dotenv').config();

// Your web app's Firebase configuration
const firebaseConfig = {
    // service type
    type: "service_account",

    // private secrets
    client_id: process.env.FIREBASE_CLIENT_ID,
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X500_CERT_URL,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    
    // public URL's
    token_uri: "https://oauth2.googleapis.com/token",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs"
}

var admin = require("firebase-admin");

admin.initializeApp({    
    credential: admin.credential.cert(firebaseConfig)
});

const emailExists = admin.auth()
    .getUserByEmail(process.env.ADMIN_EMAIL)
    .then(() => true)
    .catch(() => false);

const userProperties = {
    email: process.env.ADMIN_EMAIL,
    displayName: process.env.ADMIN_NAME,
    password: process.env.ADMIN_PASSWORD,
    emailVerified: false,
    disabled: false
};

if (!emailExists) {
    admin.auth()
    .createUser(userProperties)
    .then((userRecord) => {
        console.log('Successfully created admin user', userRecord.uid);
    })
    .catch((error) => {
        console.log('Error creating admin user', error);
    });
} else {
    console.log(`Admin with email ${process.env.ADMIN_EMAIL} already exists`);
}

module.exports = admin

var admin = require("firebase-admin");

// Your web app's Firebase configuration
const firebaseConfig = {
    "type": "service_account",
    "project_id": "recue-me",
    "private_key_id": "98e66146cc0c6b19126dfbb11b3d59021932cb48",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwU+SOn80TaCOX\nNTm2xIesHpBQkYAktP76iVeqh9zAAuY5z89iFOxYn8pj5PGkBzS3O3KVE2agjj/0\nRMPb56lakD20SOfMqA6vQojVJ9kDV9LZmai5XotkavsQXGT4Jl+gJsc2LRBhDzdq\nO6DZkeuENLj7C6jeL21MIFjegH+5Fdgku51DdK4E5gXCKb4Cs1BLKTF+R7IKPNo6\n8bXIngHR5tPlQsbTugsSGFLt2KWNM+IVSo69j8x1TygS3edWXQbgTNcWMuZ3BhUc\ndm4RmYqYaDLWU3Yt6EGBD/FBeU8px7q99mf19XTYJBYMASt+W1As4ZWM8yUdcTqo\nx43J6Ev7AgMBAAECggEAAbrkQBqCp1tCPM3hRp9V3yYau2JOOyzItV9wTnIMs3vj\nNLmZAoJVHqcwfDpkLtsi35bsV2uyxfM2doA37SVWF2WWuKidzEgzZgRpDEjffVkc\nc0JgFtAvwWHTQct8gLhaeyJlrPsWni6oGAjCcYCjvYCl9m3L6cpRX5Duy1Mx/jXx\nIqiMQF2ajee48VsfuMPu2rX0ESPW3yHuzjYFPZ5RpyTgr4ZdBpieuk/p/maJvtYn\nXqfMltJU8S/S8V6GG0BbBCmDewGYSdBf+i2rinQImBSCbt3UZcerVbmhZp5BBVZe\nVFSjhOxCspO/mxZFqXKwYPoOZldOv/XLX02n0jCSFQKBgQDZl7haO2bCBxs4ZLN3\neyEUo8h84MhqUfNT0oYqxUXOZVCGYf7Z1FnNFsojfxEoBu/Dq0giAoCHKdCCrfEd\nrrPikH4PM89XbqeCso5+Q/VntiJYRLsHEPY1ZPpqVnQdX+Zq0vaGBIliC3sl94zQ\nO3eB/CuBsfxxK7t5eK8WpQKhtwKBgQDPc4xmNhSWze3xFXL01VAiSUxi9oWurrqh\nk+glIH6KiCYKhuUwewujMrS2cqjKohf6UeSG84k4OwWBnJRZD6FHfonRwXoY+V/1\nwsasLxmSJK5il3KrYovJkcmJ6mIyUAKi7aTtXGBNkKN/aRMZztDDttDaPgGV6XyS\nplWMvb7X3QKBgQDPHUBn+vSzqSn6wrek+fmh+MgEPb3mnby8Q75bhc0NSZidYTfA\nxgT4V0HvCasd64RbPnT5kmIexeloCgNhGoK1HI4xEELC2Vvu5uEFRNCZeF82n61a\na4W/iy9k+oep0jez5LytEjJmtcDxgbFyH7iAbLRIzk8YteTMGdim+EgJ/wKBgE0V\ngnX4Ym4m1uNeNPkEymHzGo8rS0E9a9veOcSR7nNLY9dFiKQbFJfvn3ar5ExnLsG0\n7FW46KQcSk9+/yCYzjTisBNg8R2WjDGlzmzsk3PabXH1FIbad1bO9TRqA1LuqAwi\ngcYxLRelRxtwz8gnMSuIItL1d2FdAQz9AYzqdJ+BAoGAPvDv8vX9MuNOcI/bCqdw\nJSqF4Bp78D69FTAJLsT4a7dR4CvYc3yahlEgOuPpt78LCJoW7MS833MzOX3rtIa/\nvHNklErRmeA9V7QkLMpE4ygL58BQvhY6AiJApAdU+9eyYTvc91gAG4PLHRYxrRbU\ni5bb5DccB1yBzmW0lFx7Q9c=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2xakn@recue-me.iam.gserviceaccount.com",
    "client_id": "111088459996462650751",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2xakn%40recue-me.iam.gserviceaccount.com"
};

admin.initializeApp({    
    credential: admin.credential.cert(firebaseConfig)
});

const email = 'admin@admin.com'; //pasar a env vars
const password = 'admin123'; //pasar a env vars
const emailExists = admin.auth().getUserByEmail(email).then(() => true).catch(() => false);

if (!emailExists) {
    admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: 'John Doe',
        disabled: false
      })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created admin user', userRecord.uid);
       })
      .catch(function(error) {
        console.log('Error creating admin user', error);
    });
}

module.exports = admin

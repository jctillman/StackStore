module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "INSERT_TWITTER_CONSUMER_KEY_HERE",
    "consumerSecret": "INSERT_TWITTER_CONSUMER_SECRET_HERE",
    "callbackUrl": "INSERT_TWITTER_CALLBACK_HERE"
  },
  "FACEBOOK": {
    "clientID": "1514773038745300",
    "clientSecret": "ec0934ae76369315853e6ba7e43c5596",
    "callbackURL": "/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "223500789978-j9ne7oqu4tl2mgu0jaainmngc0vll3ov.apps.googleusercontent.com",
    "clientSecret": "xNvpUCWRQhWFeqLKH8-9PKHo",
    "callbackURL": "https://localhost:1337/auth/google/callback"
  },
  "STRIPE":{
    "secretKey": "sk_test_NNsgISD8Diz6UXQreTb0loAk"
  }
};
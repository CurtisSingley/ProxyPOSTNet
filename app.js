// Dependencies
var Twit = require('twit')
var request = require('request')
var OAuth = require('oauth-1.0a')
var crypto = require('crypto')
var nonce = require('nonce-generator');
const express = require('express');
// var aws = require('aws-sdk');
// let awsConfig = {
//   "region": "us-east-2",
//   "endpoint": "",
// };

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('./'));

// app.get('/sharerAdded', (req, res) => {
//   reqStr = req.toString();
//   if(reqStr.includes('oauth_token') && reqStr.includes('oauth_verifier')) {
//     res.send("you got oauth_token and oauth_verifier");
//     return;
//   }
// })

app.get('/addSharer', (req, res) => {
  // https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a/obtaining-user-access-tokens
  if(req.query.oauth_token && req.query.oauth_verifier) {
    // now we know we are redirected here
    // Step 3: POST oauth/access_token
    request(
          {
            url : 'https://api.twitter.com/oauth/access_token?oauth_token=' + req.query.oauth_token + '&oauth_verifier=' + req.query.oauth_verifier,
            method : 'POST',
          },
          function(error, response, oauth_token_and_secret) {
            // will be redirected to callback page
            idx = oauth_token_and_secret.indexOf('&oauth_token_secret=');
            idx2 = oauth_token_and_secret.indexOf('&user_id=');
            // res.send('oauth_token is ' + oauth_token_and_secret.substring(0, idx) + '\noauth_token_secret is ' + oauth_token_and_secret.substring(idx + 20, idx2))
            res.send('<script>alert("Thank you for contributing! Your account is added to our database.")</script>')
          }
    )  
  }
  else {
    // Step 1: POST oauth/request_token
    const oauth = OAuth({
      consumer: {
          // both should be specified in order to accomplish step 1
          // oauth_consumer_key
          key: 'rPKDyu7qGrXFEbmNhx1wGejL0',
          // oauth_consumer_key_secret
          secret: 'aLAnwtNVaXPalrGCiviYX6gkK8imRgzIzK0gUzui8dN7X9dKho',
      },
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
          return crypto
              .createHmac('sha1', key)
              .update(base_string)
              .digest('base64')
      },
  })
  
  const request_data = {
      url: 'https://api.twitter.com/oauth/request_token',
      method: 'POST',
      data: { 
              // oauth_callback : 'http://hacksc.wenheqi.net',
              // oauth_callback : 'http://127.0.0.1:3000/addSharer',
              oauth_callback : 'http://hacksc.wenheqi.net/addSharer',
              // PIN based
              // oauth_callback : 'oob',
            },
  }
  
  // Note: The token is optional for some requests
  const token = {
      // key: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
      // secret: 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE',
  }
  
  request(
      {
          url: request_data.url,
          method: request_data.method,
          form: oauth.authorize(request_data, token),
      },
      function(error, response, request_token) {
        // res.send(request_token)  
        // Step 2: GET oauth/authorize
          request(
                  {
                    url : 'https://api.twitter.com/oauth/authorize?' + request_token,
                    method : 'GET',
                  },
                  function(error, response, data) {
                    // will be redirected to callback page
                    res.send(data)
                  }
          ) 
      }
  )
  }


  // get access_token
  // get access_token_secret
});

// post tweet on Twitter
app.post('/poststatus', (req, res) => {
  var T = new Twit({
    consumer_key:         'rPKDyu7qGrXFEbmNhx1wGejL0',
    consumer_secret:      'aLAnwtNVaXPalrGCiviYX6gkK8imRgzIzK0gUzui8dN7X9dKho',
    // this should be replaced by user-specific oauth_token
    access_token:         '910522266408034304-XQ8ioBe5OuXe0TX9iXlYqRcyttAFZ4U',
    // this should be replaced by user-specific oauth_token_secret
    access_token_secret:  'VKNw7Rq16iIduEZAWUoOccDaUjsA6XOGznWAmNj8Z06dt',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })
  
  // tweet user's content
  // T.post('statuses/update', { status: 'current time is ' + Math.floor(new Date() / 1000) }, function(err, data, response) {
  T.post('statuses/update', { status: req.query.tweet }, function(err, data, response) {
    // console.log(data)
    res.send(data)
  })
});

app.listen(port, () => console.log(`twitter app listening on port ${port}!`));




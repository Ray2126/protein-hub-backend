const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

function generatePolicy({ principalId, effect, resource }) {
  const authResponse = {
    principalId,
  };
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }
      ],
    };
    authResponse.policyDocument = policyDocument;
  }
  console.info('response from authorization function', authResponse);
  return authResponse;
}

function getKey(header, callback) {
  const client = jwksClient({
    jwksUri: 'https://dev-jd41cus6.au.auth0.com/.well-known/jwks.json'
  });
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  })
}

const options = {
  algorithms: [ 'RS256' ],
  audience: 'https://90yd15q08j.execute-api.ap-southeast-2.amazonaws.com/Prod/',
  issuer: 'https://dev-jd41cus6.au.auth0.com/',
};

exports.handler =  function(event, context, callback) {
  console.info('received:', event);
  
  const token = event.authorizationToken.replace('Bearer ', '');
  jwt.verify(token, getKey, options, function(err, decoded) {
    if(err) {
      console.error('jwt authorization failed', err);
      callback("Unauthorized");
    } else {
      callback(null, generatePolicy({
        principalId: 'user',
        effect: 'Allow',
        resource: event.methodArn
      }));
    }
  });
};
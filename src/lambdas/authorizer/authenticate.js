require('dotenv').config({ silent: true });

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

function getPolicyDocument(effect, resource) {
  const policyDocument = {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }]
  };
  return policyDocument;
}

function getToken(event) {
  if (!event.type || event.type !== 'TOKEN') {
    throw new Error('Expected "event.type" parameter to have value "TOKEN"');
  }

  const tokenString = event.authorizationToken;
  if (!tokenString) {
    throw new Error('Expected "event.authorizationToken" parameter to be set');
  }

  const match = tokenString.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new Error(`Invalid Authorization token - ${tokenString} does not match "Bearer .*"`);
  }
  return match[1];
}

const jwtOptions = {
  audience: process.env.AUDIENCE,
  issuer: process.env.TOKEN_ISSUER
};

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksUri: process.env.JWKS_URI
});

async function authenticate(event) {
  const token = getToken(event);

  const decoded = jwt.decode(token, { complete: true });
  if (!decoded?.header?.kid) {
    throw new Error('invalid token');
  }

  const key = await client.getSigningKey(decoded.header.kid);
  const signingKey = key.publicKey || key.rsaPublicKey;
  jwt.verify(token, signingKey, jwtOptions);
  const policy = {
    principalId: decoded.payload.sub,
    policyDocument: getPolicyDocument('Allow', event.methodArn),
    context: { scope: decoded.scope }
  };
  return policy;
}

module.exports = authenticate;
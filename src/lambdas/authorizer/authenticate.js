require('dotenv').config({ silent: true });

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const generatePolicy = require('./generatePolicy');
const extractTokenFromEvent = require('./extractTokenFromEvent');

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
  const token = extractTokenFromEvent(event);
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded?.header?.kid) {
    throw new Error('invalid token');
  }
  const key = await client.getSigningKey(decoded.header.kid);
  const signingKey = key.publicKey || key.rsaPublicKey;
  jwt.verify(token, signingKey, jwtOptions);
  const policy = generatePolicy({
    principalId: decoded.payload.sub,
    effect: 'Allow',
    resource: event.methodArn,
    context: { scope: decoded.scope },
  });
  return policy;
}

module.exports = authenticate;
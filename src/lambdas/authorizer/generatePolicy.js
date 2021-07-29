function generatePolicy({ principalId, effect, resource, context}) {
  const policyDocument = {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }]
  };
  const policy = {
    principalId,
    policyDocument: effect && resource && policyDocument,
    context,
  };
  return policy;
}

module.exports = generatePolicy;

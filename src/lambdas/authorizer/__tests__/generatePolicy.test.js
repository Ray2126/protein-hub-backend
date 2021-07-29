const generatePolicy = require('../generatePolicy');

describe('generatePolicy', () => {
  test('generates well-formed policy', () => {
    const expected = {
      principalId: '1234',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [{
          Action: 'execute-api:Invoke',
          Effect: 'allow',
          Resource: 'arn:1234',
        }]
      },
      context: {
        info: 'hello',
      },
    };
    const context = { info: 'hello' };
    const policy = generatePolicy({
      principalId: '1234',
      effect: 'allow',
      resource: 'arn:1234',
      context,
    });
    expect(policy).toEqual(expected);
  });

  test('missing effect', () => {
    const expected = {
      principalId: '1234',
      context: {
        info: 'hello',
      },
    };
    const context = { info: 'hello' };
    const policy = generatePolicy({
      principalId: '1234',
      resource: 'arn:1234',
      context,
    });
    expect(policy).toEqual(expected);
  });

  test('missing resource', () => {
    const expected = {
      principalId: '1234',
      context: {
        info: 'hello',
      },
    };
    const context = { info: 'hello' };
    const policy = generatePolicy({
      principalId: '1234',
      effect: 'allow',
      context,
    });
    expect(policy).toEqual(expected);
  });

  test('missing resource and effect', () => {
    const expected = {
      principalId: '1234',
      context: {
        info: 'hello',
      },
    };
    const context = { info: 'hello' };
    const policy = generatePolicy({
      principalId: '1234',
      context,
    });
    expect(policy).toEqual(expected);
  });
});
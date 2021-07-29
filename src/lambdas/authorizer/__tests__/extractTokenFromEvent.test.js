const extractTokenFromEvent = require('../extractTokenFromEvent');

describe('extractTokenFromEvent', () => {
  test('well-formed token', () => {
    const event = {
      type: 'TOKEN',
      authorizationToken: 'Bearer 1234',
      methodArn: 'arn:1234',
    };
    const token = extractTokenFromEvent(event);
    expect(token).toEqual('1234');
  });

  test('not TOKEN type', () => {
    const event = {
      type: 'NOT TOKEN',
      authorizationToken: 'Bearer 1234',
      methodArn: 'arn:1234',
    };
    try {
      extractTokenFromEvent(event);
    } catch(err) {
      expect(err.message).toEqual('Expected "event.type" parameter to have value "TOKEN"');
    }
  });

  test('missing token', () => {
    const event = {
      type: 'TOKEN',
      methodArn: 'arn:1234',
    };
    try {
      extractTokenFromEvent(event);
    } catch(err) {
      expect(err.message).toEqual('Expected "event.authorizationToken" parameter to be set');
    }
  });

  test('missing bearer in the token', () => {
    const event = {
      type: 'TOKEN',
      authorizationToken: '1234',
      methodArn: 'arn:1234',
    };
    try {
      extractTokenFromEvent(event);
    } catch(err) {
      expect(err.message).toEqual('Invalid Authorization token - 1234 does not match "Bearer .*"');
    }
  });

  test('multiple bearer in the token', () => {
    const event = {
      type: 'TOKEN',
      authorizationToken: 'Bearer 1234 Bearer',
      methodArn: 'arn:1234',
    };
    try {
      extractTokenFromEvent(event);
    } catch(err) {
      expect(err.message).toEqual('Invalid Authorization token - 1234 does not match "Bearer .*"');
    }
  });
});
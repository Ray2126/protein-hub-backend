const authenticate = require('./authenticate');

module.exports.handler = async (event, context) => {
  console.log('received event: ', event);
  try {
    const data = await authenticate(event);
    return data;
  }
  catch (err) {
    console.log('jwt authentication failed with: ', err);
    throw new Error('Unauthorized');
  }
};
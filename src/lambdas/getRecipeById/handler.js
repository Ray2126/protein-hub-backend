const middy = require('@middy/core');
const jsonBodyParser = require('@middy/http-json-body-parser');
const cors = require('@middy/http-cors');

const recipesTable = require('../../../libs/tables/recipesTable');

async function getRecipeById(event) {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }

  console.info('received:', event);

  const recipeId = event.pathParameters.id;
  const recipe = await recipesTable.getRecipeById(recipeId);

  const response = {
    statusCode: 200,
    body: JSON.stringify(recipe.toResponseDocument()),
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};

const handler = middy(getRecipeById)
  .use(jsonBodyParser())
  .use(cors());

module.exports = { handler };

const Recipe = require('../models/Recipe');
const docClient = require('../dynamodb/documentClient');

class RecipesTable {
  constructor() {
    this.tableName = 'recipes-prod';
    this.docClient = docClient;
  }

  async getRecipeById(id) {
    const result = await this.docClient.query({
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':pk': `Recipe#${id}`,
        ':sk': 'Date#',
      },
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
    }).promise().catch(err => {
      console.error(err);
      throw new Error('GetRecipeFailed', err);
    });
    return result.Items ? Recipe.fromDynamoDocument(result.Items[0]) : undefined;
  }
}

module.exports = new RecipesTable();